#!/usr/bin/env zx

import fs from "fs/promises";

console.log(chalk.blue(`Running run_1_term-env...`))
$.verbose = false;

const stepFile = await $`chezmoi data | jq -r '.chezmoi.workingTree + "/.steps/step2"'`;

if (await $`test -f ${stepFile}`.exitCode !== 0) {
  console.log("Installing some packages...");
  console.time("Done!");
  await $`echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | sudo debconf-set-selections`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  const packages = [
    "exfat-fuse",
    "exfat-utils",
    "ubuntu-restricted-extras",
    "tmux",
    "neovim",
    "ripgrep",
    "libsecret-tools",
    "libjpeg-dev",
    "libgif-dev",
    "libpixman-1-dev",
    "libcairo2-dev",
    "libpango1.0-dev",
    "libjpeg8-dev",
  ];
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y ${packages}`;
  await $`touch ${stepFile}`;
  console.timeEnd("Done!");
}

if (await $`hash kitty`.exitCode !== 0) {
  console.log("Installing Kitty...");
  console.time("Done!");
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y kitty`;
  // Set the default terminal application
  await $`sudo update-alternatives --set x-terminal-emulator /usr/bin/kitty`;
  console.timeEnd("Done!");
}

if (await $`hash fish`.exitCode !== 0) {
  console.log("Installing Fishshell...");
  console.time("Done!");
  await $`sudo apt-add-repository -y ppa:fish-shell/release-3`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y fish`;
  await $`chsh -s $(which fish)`;
  console.timeEnd("Done!");
}

if (await $`[[ -f ~/.config/fish/completions/chezmoi.fish ]]`.exitCode !== 0) {
  console.log("Installing chezmoi completion...");
  console.time("Done!");
  await $`chezmoi completion fish --output=~/.config/fish/completions/chezmoi.fish`;
  console.timeEnd("Done!");
}

if (await $`[[ -d ~/.SpaceVim ]]`.exitCode !== 0) {
  console.log("Installing SpaceVim...");
  console.time("Done!");
  await $`curl -sLf https://spacevim.org/install.sh | bash -s -- --install neovim`;
  await $`cd ~/.SpaceVim && git checkout v1.8.0`;
  console.timeEnd("Done!");
}

const fontFolder = `${process.env.HOME}/.local/share/fonts`;
const fontFamily = "Retina";
const fontName = `Fira Code ${fontFamily} Nerd Font Complete Mono.ttf`;
if (await $`[[ -f ${fontFolder}/${fontName} ]]`.exitCode !== 0) {
  console.log("Installing Nerd font...");
  console.time("Done!");
  const fontUrl = `https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v2.1.0/patched-fonts/FiraCode/${fontFamily}/complete/${encodeURIComponent(fontName)}`;
  await fs.mkdir(fontFolder, { recursive: true });
  await $`curl -fsSL -o ${fontFolder}/${fontName} ${fontUrl}`;
  await $`fc-cache -r`;
  console.timeEnd("Done!");
}
// TODO: check new version

if (await $`[[ -d ~/.tmux/plugins/tpm ]]`.exitCode !== 0) {
  console.log("Installing Tpm...");
  console.time("Done!");
  await $`git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`;
  console.timeEnd("Done!");
}

await $`hostnamectl set-hostname davidfou`;
await $`hostnamectl set-hostname "David Fournier" --pretty`;
