#!/usr/bin/env zx

import fs from "fs/promises";

console.log(chalk.blue(`Running run_1_term-env...`));
$.verbose = false;

const stepFile =
  await $`chezmoi data | jq -r '.chezmoi.workingTree + "/.steps/step2"'`;

if ((await $`test -f ${stepFile}`.exitCode) !== 0) {
  console.log("Installing some packages...");
  console.time("Done!");
  await $`echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | sudo debconf-set-selections`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  const packages = [
    "exfat-fuse",
    "exfatprogs",
    "ubuntu-restricted-extras",
    "tmux",
    "ripgrep",
    "libsecret-tools",
    "libjpeg-dev",
    "libgif-dev",
    "libpixman-1-dev",
    "libcairo2-dev",
    "libpango1.0-dev",
    "libjpeg8-dev",
    "amazon-ecr-credential-helper",
    "libnotify-bin", // for fisher done plugin
  ];
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y ${packages}`;
  await $`touch ${stepFile}`;
  console.timeEnd("Done!");
}

if ((await $`hash fish`.exitCode) !== 0) {
  console.log("Installing Fishshell...");
  console.time("Done!");
  await $`sudo apt-add-repository -y ppa:fish-shell/release-3`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y fish`;
  await $`sudo chsh -s $(which fish) $(whoami)`;
  console.timeEnd("Done!");
}

if (
  (await $`[[ -f ~/.config/fish/completions/chezmoi.fish ]]`.exitCode) !== 0
) {
  console.log("Installing chezmoi completion...");
  console.time("Done!");
  await $`chezmoi completion fish --output=~/.config/fish/completions/chezmoi.fish`;
  console.timeEnd("Done!");
}

if ((await $`[[ -d ~/.tmux/plugins/tpm ]]`.exitCode) !== 0) {
  console.log("Installing Tpm...");
  console.time("Done!");
  await $`git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`;
  console.timeEnd("Done!");
}

await $`hostnamectl set-hostname davidfou`;
await $`hostnamectl set-hostname "David Fournier" --pretty`;
