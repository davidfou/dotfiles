#!/usr/bin/env zx

console.log(chalk.blue(`Running run_after_2_kitty...`));
$.verbose = false;

const data = JSON.parse((await $`chezmoi data`).stdout);

const getVersionInformation = (version) =>
  fetch(
    `https://api.github.com/repos/kovidgoyal/kitty/releases/${version}`,
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error(
        `Unexpected response ${resp.statusText} when getting information for versions ${version}`,
      );
    }
    return resp.json();
  });

const getCurrentVersion = async () => {
  let output;
  try {
    output = await $`fish -c "kitty --version"`;
  } catch (error) {
    if (error.stderr?.includes("Unknown command")) {
      return null;
    }
    throw error;
  }
  return `v${output.stdout.split(" ")[1]}`;
};

const latestVersion = await getVersionInformation("latest");
const desiredVersion = await getVersionInformation(
  `tags/v${data.extraToolVersion.kitty}`,
);
const currentVersion = await getCurrentVersion();

if (desiredVersion.tag_name !== latestVersion.tag_name) {
  console.log(
    chalk.yellow(`Version ${latestVersion.tag_name} of kitty is available!`),
  );
}

if (currentVersion !== desiredVersion.tag_name) {
  console.log(`Installing kitty version ${desiredVersion.tag_name}...`);
  console.time("Done!");
  const asset = desiredVersion.assets.find((asset) =>
    asset.name.endsWith("x86_64.txz"),
  );
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "kitty-"));
  const extractFolder = path.join(os.homedir(), ".local/kitty.app");
  await $`curl -sSL -o ${path.join(folder, "kitty.txz")} ${
    asset.browser_download_url
  }`;

  await fs.remove(extractFolder);
  await fs.mkdir(extractFolder);
  await $`tar -C ${extractFolder} -xJof ${path.join(folder, "kitty.txz")}`;

  await Promise.all(
    ["kitty.desktop", "kitty-open.desktop"].map(async (filename) => {
      const content = await fs.readFile(
        path.join(extractFolder, "/share/applications", filename),
        "utf8",
      );
      await fs.writeFile(
        path.join(os.homedir(), ".local/share/applications", filename),
        content
          .replaceAll(
            "Icon=kitty",
            `Icon=${path.join(
              os.homedir(),
              ".local/kitty.app/share/icons/hicolor/256x256/apps/kitty.png",
            )}`,
          )
          .replaceAll(
            "Exec=kitty",
            `Exec=${path.join(os.homedir(), ".local/kitty.app/bin/kitty")}`,
          ),
      );
    }),
  );

  const kittyBin = path.join(os.homedir(), ".local/kitty.app/bin/kitty");
  await fs.ensureSymlink(kittyBin, path.join(os.homedir(), ".local/bin/kitty"));
  await fs.ensureSymlink(
    path.join(os.homedir(), ".local/kitty.app/bin/kitten"),
    path.join(os.homedir(), ".local/bin/kitten"),
  );
  await $`sudo update-alternatives --install /usr/bin/x-terminal-emulator x-terminal-emulator ${kittyBin} 10`;
  await $`sudo update-alternatives --set x-terminal-emulator ${kittyBin}`;
  await $`gsettings set org.gnome.desktop.default-applications.terminal exec 'kitty'`;
  console.timeEnd("Done!");
}
