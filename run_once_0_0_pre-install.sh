#!/bin/bash

set -e

sudo apt-get update
sudo apt install -y curl git

# Install asdf
if hash asdf &>/dev/null
then
  echo "[skip] Asdf already installed"
else
  echo "-> Installing asdf"
  git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.8
  . $HOME/.asdf/asdf.sh
  mkdir -p ~/.config/fish/completions
  ln -s ~/.asdf/completions/asdf.fish ~/.config/fish/completions
fi
