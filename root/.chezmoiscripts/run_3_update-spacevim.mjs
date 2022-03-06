#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-spacevim...`));
$.verbose = false;

console.time("Done!");
await $`nvim "+call dein#install#_update([], 'update', 0)" '+qall'`;
console.timeEnd("Done!");
