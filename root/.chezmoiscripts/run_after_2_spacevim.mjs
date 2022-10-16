#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_spacevim...`))
$.verbose = false;

if (await $`[[ -d ~/.SpaceVim ]]`.exitCode !== 0) {
  console.log("Installing SpaceVim...");
  console.time("Done!");
  await $`curl -sLf https://spacevim.org/install.sh | bash -s -- --install neovim`;
  console.timeEnd("Done!");
}
