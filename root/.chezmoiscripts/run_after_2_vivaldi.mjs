#!/usr/bin/env zx

import Stream from "node:stream/promises";

console.log(chalk.blue(`Running run_after_2_vivaldi...`));
$.verbose = false;
$.shell = "/usr/bin/fish";

const installVivaldi = async (version) => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "vivaldi-"));
  const resp = await fetch(
    `https://downloads.vivaldi.com/stable/vivaldi-stable_${version}_amd64.deb`,
  );
  if (!resp.ok) {
    throw new Error(
      `Unexpected response ${resp.statusText} when downloading Vivaldi`,
    );
  }

  const file = path.join(folder, "vivaldi.deb");
  await Stream.pipeline(resp.body, fs.createWriteStream(file));

  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y ${file}`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 remove -y firefox`;
};

const description = await fetch(
  "https://repo.vivaldi.com/stable/deb/dists/stable/main/binary-amd64/Packages",
).then((resp) => {
  if (!resp.ok) {
    throw new Error(
      `Unexpected response ${resp.statusText} when getting Vivaldi information`,
    );
  }
  return resp.text();
});
const position = description.indexOf("Package: vivaldi-stable");
if (position === -1) {
  throw new Error("Could not find Vivaldi-stable in the Packages file");
}
const data = Object.fromEntries(
  description
    .slice(position)
    .split("\n")
    .slice(0, 5)
    .map((line) => line.split(": ")),
);
if (data.Version === undefined) {
  throw new Error("Could not find Vivaldi-stable version in the Packages file");
}
const latestVersion = data.Version;

if ((await $`type -q vivaldi`.exitCode) !== 0) {
  console.log("Installing vivaldi...");
  console.time("Done!");

  await installVivaldi(latestVersion);
  await $`sudo update-alternatives --set x-www-browser /usr/bin/vivaldi-stable`;
  await $`sudo update-alternatives --set gnome-www-browser /usr/bin/vivaldi-stable`;
  console.timeEnd("Done!");
} else {
  const currentVersion = (await $`vivaldi --version`).stdout.split(" ")[1];
  if (latestVersion.split("-")[0] !== currentVersion) {
    console.log(
      `Updating vivaldi from ${currentVersion} to ${
        latestVersion.split("-")[0]
      } ...`,
    );
    console.time("Done!");
    await installVivaldi(latestVersion);
    console.timeEnd("Done!");
  }
}
