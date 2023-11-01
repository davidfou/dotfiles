#!/usr/bin/env zx

console.log(chalk.blue(`Running run_after_2_fonts...`));
$.verbose = false;

const data = JSON.parse((await $`chezmoi data`).stdout);
const fontFolder = `${os.homedir()}/.local/share/fonts`;
const currentVersionFile = path.join(fontFolder, ".nerdFontsVersion");

const getVersionInformation = (version) =>
  fetch(
    `https://api.github.com/repos/ryanoasis/nerd-fonts/releases/${version}`,
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error(
        `Unexpected response ${resp.statusText} when getting information for versions ${version}`,
      );
    }
    return resp.json();
  });

const getCurrentVersion = async () => {
  try {
    const content = await fs.readFile(currentVersionFile, "utf8");
    return content.trim();
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

const latestVersion = await getVersionInformation("latest");
const desiredVersion = await getVersionInformation(
  `tags/v${data.extraToolVersion.nerdFonts}`,
);
const currentVersion = await getCurrentVersion();

if (desiredVersion.tag_name !== latestVersion.tag_name) {
  console.log(
    chalk.yellow(
      `Version ${latestVersion.tag_name} of nerd-fonts is available!`,
    ),
  );
}

if (currentVersion !== desiredVersion.tag_name) {
  console.log(`Installing Nerd font version ${desiredVersion.tag_name}...`);
  console.time("Done!");
  await fs.mkdir(fontFolder, { recursive: true });
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "nerdFonts-"));
  console.log();
  const asset = desiredVersion.assets.find(
    ({ name }) => name === "FiraCode.tar.xz",
  );
  await $`curl -sSL -o ${path.join(folder, "FiraCode.tar.xz")} ${
    asset.browser_download_url
  }`;
  await fs.mkdir(path.join(folder, "extract"), { recursive: true });
  await $`tar -xf ${path.join(folder, "FiraCode.tar.xz")} -C ${path.join(
    folder,
    "extract",
  )}`;
  const files = await fs.readdir(path.join(folder, "extract"));
  Promise.all(
    files
      .filter((file) => file.includes("Mono") && file.endsWith(".ttf"))
      .map((file) =>
        fs.copy(
          path.join(folder, "extract", file),
          path.join(fontFolder, file),
        ),
      ),
  );
  await $`fc-cache -fr`;
  await fs.writeFile(currentVersionFile, desiredVersion.tag_name);
  console.timeEnd("Done!");
}
