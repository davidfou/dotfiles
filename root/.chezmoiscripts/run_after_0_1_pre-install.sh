#!/bin/bash

set -e

blue=`tput setaf 4`
reset=`tput sgr0`
echo "${blue}Running run_0_1_pre-install...${reset}"

# Install asdf
if test -d ~/.asdf
then
  echo "[skip] Asdf already installed"
else
  echo "-> Installing asdf"
  sudo apt-get -o DPkg::Lock::Timeout=60 update
  sudo apt-get -o DPkg::Lock::Timeout=60 install -y \
    curl git `# asdf requirements` \
    dirmngr gpg `# asdf nodejs requirements` \
    unzip `# asdf 1password requirements`

  git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1
  mkdir -p ~/.config/fish/completions
  ln -s ~/.asdf/completions/asdf.fish ~/.config/fish/completions

  . $HOME/.asdf/asdf.sh
fi
