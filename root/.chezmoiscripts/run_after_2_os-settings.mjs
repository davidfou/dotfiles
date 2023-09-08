#!/usr/bin/env zx

import path from "path";

console.log(chalk.blue(`Running run_2_os-settings...`));
$.verbose = false;

console.time("Done!");
const data = JSON.parse((await $`chezmoi data`).toString());
await $`dconf load / < ${path.join(data.chezmoi.workingTree, "dconf.ini")}`;

await $`sudo update-locale LANG=en_US.UTF-8`;
await $`sudo update-locale LC_MONETARY=fr_FR.UTF-8`;
await $`sudo update-locale LC_NUMERIC=fr_FR.UTF-8`;
await $`sudo update-locale LC_TIME=fr_FR.UTF-8`;
await $`sudo update-locale LC_PAPER=fr_FR.UTF-8`;
await $`sudo update-locale LC_NAME=fr_FR.UTF-8`;
await $`sudo update-locale LC_ADDRESS=fr_FR.UTF-8`;
await $`sudo update-locale LC_TELEPHONE=fr_FR.UTF-8`;
await $`sudo update-locale LC_MEASUREMENT=fr_FR.UTF-8`;
await $`sudo update-locale LC_IDENTIFICATION=fr_FR.UTF-8`;

console.timeEnd("Done!");
