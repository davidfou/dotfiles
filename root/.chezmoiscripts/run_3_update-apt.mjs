#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-apt...`));
$.verbose = false;

console.time("Done!");
await $`sudo apt-get update -y`;
await $`sudo apt-get upgrade -y`;
await $`sudo apt-get dist-upgrade -y`;
console.timeEnd("Done!");
