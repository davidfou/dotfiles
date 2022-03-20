#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-flatpak...`))
$.verbose = false;

console.time("Done!");
await $`flatpak update -y`;
console.timeEnd("Done!");
