#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-asdf...`));
$.verbose = false;

console.time("Done!");
await $`asdf plugin update --all`;
console.timeEnd("Done!");
