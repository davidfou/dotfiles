#!/bin/bash

set -e

sudo apt-get update
sudo apt install -y \
  exfat-fuse exfat-utils ubuntu-restricted-extras \
  tmux neovim ripgrep libsecret-tools \
  libjpeg-dev libgif-dev

# Enables hostname.local to be exposed
sudo apt install -y avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan libnss-mdns

# gtags layer dependency https://spacevim.org/layers/gtags/
sudo apt install -y \
  global exuberant-ctags

# Install Kitty and set it as default terminal application
if hash kitty &>/dev/null
then
  echo "[skip] Kitty already installed"
else
  echo "-> Installing Kitty..."
  sudo apt install -y kitty
  sudo update-alternatives --set x-terminal-emulator /usr/bin/kitty
fi

# Install Fishshell and makes it the default shell
if hash fish &>/dev/null
then
  echo "[skip] Fishshell already installed"
else
  echo "-> Installing Fishshell..."
  sudo apt-add-repository -y ppa:fish-shell/release-3
  sudo apt-get update
  sudo apt install -y fish
  chsh -s $(which fish)
fi
chezmoi completion fish --output=~/.config/fish/completions/chezmoi.fish

# Install SpaceVim
if test -d ~/.SpaceVim
then
  echo "[skip] SpaceVim already installed"
else
  echo "->  Installing SpaceVim..."
  curl -sLf https://spacevim.org/install.sh | bash -s -- --install neovim
fi

# Install font
FONT_FAMILY='Retina'
FONT_NAME="Fira Code $FONT_FAMILY Nerd Font Complete Mono.ttf"
ENCODED_FONT_NAME=$(echo "$FONT_NAME" | sed 's/ /%20/g')
if test -f ~/.local/share/fonts/"$FONT_NAME"
then
  echo "[skip] Font already installed"
else
  echo "-> Installing font..."
  mkdir -p ~/.local/share/fonts
  FONT_URL=https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v2.1.0/patched-fonts/FiraCode/$FONT_FAMILY/complete/$ENCODED_FONT_NAME
  curl -fsSL -o ~/.local/share/fonts/"$FONT_NAME" $FONT_URL
  fc-cache -r
fi

# Install tpm
if test -d ~/.tmux/plugins/tpm
then
  echo "[skip] Tpm already installed"
else
  echo "-> Installing tpm..."
  git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
fi

# Setup hostname
hostnamectl set-hostname davidfou
hostnamectl set-hostname "David Fournier" --pretty
