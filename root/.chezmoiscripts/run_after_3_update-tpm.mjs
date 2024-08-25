#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_update-tpm...`));
$.verbose = false;

console.time("Done!");
if (await $`tmux info`.exitCode === 0) {
  await $`~/.config/tmux/plugins/tpm/bin/install_plugins`;
  await $`~/.config/tmux/plugins/tpm/bin/update_plugins all`;
  await $`~/.config/tmux/plugins/tpm/bin/clean_plugins`;
} else {
  console.log(chalk.yellow(`[!] tmux is not running`));
}
console.timeEnd("Done!");
