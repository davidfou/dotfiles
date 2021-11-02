#!/bin/bash

set -e

sudo apt-get update
sudo apt install -y \
  curl git `# asdf requirements` \
  dirmngr gpg `# asdf nodejs requirements` \
  unzip `# asdf 1password requirements`

# Install asdf
if test -d ~/.asdf
then
  echo "[skip] Asdf already installed"
else
  echo "-> Installing asdf"
  git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1
  mkdir -p ~/.config/fish/completions
  ln -s ~/.asdf/completions/asdf.fish ~/.config/fish/completions
fi
