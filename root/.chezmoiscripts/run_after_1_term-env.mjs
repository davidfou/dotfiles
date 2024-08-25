#!/usr/bin/env zx

import fs from "fs/promises";
import os from "os";

console.log(chalk.blue(`Running run_after_1_term-env...`));

if (os.platform() === "darwin") {
  const SHELLS_FILE = "/etc/shells";
  const FISH_PATH = "/opt/homebrew/bin/fish";
  const content = await fs.readFile("/etc/shells", "utf8");

  if (!content.includes("/fish")) {
    await $`echo ${FISH_PATH} | sudo tee -a ${SHELLS_FILE}`;
    await $`chsh -s ${FISH_PATH}`;
  }
}

if ((await $`[[ -d ~/.config/tmux/plugins/tpm ]]`.exitCode) !== 0) {
  console.log("Installing Tpm...");
  console.time("Done!");
  await $`git clone https://github.com/tmux-plugins/tpm ~/.config/tmux/plugins/tpm`;
  console.timeEnd("Done!");
}
