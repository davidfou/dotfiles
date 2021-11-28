#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_update-asdf...`));
$.verbose = false;

console.time("Done!");
await $`asdf update`;
await $`asdf plugin update --all`;
console.timeEnd("Done!");
