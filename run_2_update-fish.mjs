#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_update-fish...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

console.time("Done!");
await $`fisher update`;
console.timeEnd("Done!");