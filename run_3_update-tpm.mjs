#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-tpm...`));
$.verbose = false;

console.time("Done!");
await $`~/.tmux/plugins/tpm/bin/install_plugins`;
await $`~/.tmux/plugins/tpm/bin/update_plugins all`;
await $`~/.tmux/plugins/tpm/bin/clean_plugins`;
console.timeEnd("Done!");
