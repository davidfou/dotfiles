#!/usr/bin/env zx

console.log(chalk.blue(`Running run_after_2_change-remote...`));
$.verbose = false;

const { stdout: current } = await $`chezmoi git remote get-url origin`;
if (!current.startsWith('git@')) {
  await $`chezmoi git remote remove origin`;
  await $`chezmoi git remote add origin git@github.com:davidfou/dotfiles.git`;
  await $`chezmoi git fetch`;
  await $`chezmoi git -- branch -u origin/main`;
}
