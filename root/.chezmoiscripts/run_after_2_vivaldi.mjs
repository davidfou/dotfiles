#!/usr/bin/env zx

import Stream from "node:stream/promises";

console.log(chalk.blue(`Running run_after_2_vivaldi...`));
$.verbose = false;
$.shell = "/usr/bin/fish";

if ((await $`type -q vivaldi`.exitCode) !== 0) {
  console.log("Installing vivaldi...");
  console.time("Done!");

  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "vivaldi-"));
  const resp = await fetch(
    "https://downloads.vivaldi.com/stable/vivaldi-stable_6.2.3105.45-1_amd64.deb"
  );
  if (!resp.ok) {
    throw new Error(
      `Unexpected response ${resp.statusText} when downloading Vivaldi`
    );
  }

  const file = path.join(folder, "vivaldi.deb");
  await Stream.pipeline(resp.body, fs.createWriteStream(file));

  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y ${file}`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 remove -y firefox`;
  await $`sudo update-alternatives --set x-www-browser /usr/bin/vivaldi-stable`;
  await $`sudo update-alternatives --set gnome-www-browser /usr/bin/vivaldi-stable`;
  console.timeEnd("Done!");
}
