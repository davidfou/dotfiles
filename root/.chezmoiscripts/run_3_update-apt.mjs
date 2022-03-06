#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-apt...`));
$.verbose = false;

console.time("Done!");
await $`sudo apt-get -o DPkg::Lock::Timeout=60 update -y`;
await $`sudo apt-get -o DPkg::Lock::Timeout=60 upgrade -y`;
await $`sudo apt-get -o DPkg::Lock::Timeout=60 dist-upgrade -y`;
console.timeEnd("Done!");
