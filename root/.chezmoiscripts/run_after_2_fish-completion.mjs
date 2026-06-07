#!/usr/bin/env zx

console.log(chalk.blue(`Running run_after_2_fish-completion...`));
$.verbose = false;

await $`wt config shell install fish -y`;
