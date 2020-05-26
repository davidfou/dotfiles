#!/bin/bash

set -e

GITHUB_URL=https://raw.githubusercontent.com

echo "-> Installing few packages..."
sudo apt-add-repository -y ppa:mdoyen/homebank
sudo apt-add-repository -y ppa:fish-shell/release-3
sudo apt-get update
sudo apt install -y \
  exfat-fuse exfat-utils ubuntu-restricted-extras \
  dirmngr gpg curl \
  build-essential libssl-dev zlib1g-dev libbz2-dev \
  libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
  xz-utils tk-dev libffi-dev liblzma-dev python-openssl git \
  sakura tmux homebank

# Make Sakura as default terminal application
sudo update-alternatives --set x-terminal-emulator /usr/bin/sakura

# Install Fishshell and makes it the default shell
if [[ "$SHELL" =~ .*/fish ]]
then
	echo "[skip] Fishshell already installed"
else
	echo "-> Installing Fishshell..."
  sudo apt install -y fish
	echo "/bin/fish" | sudo tee -a /etc/shells
	chsh -s "$HOMEBREW_PREFIX/bin/fish"
fi

# Install SpaceVim
if test -d ~/.SpaceVim
then
	echo "[skip] SpaceVim already installed"
else
	echo "->  Installing SpaceVim..."
	curl -sLf https://spacevim.org/install.sh | bash -s -- --install neovim
fi

# Install font
FONT_NAME='Fura Code Regular Nerd Font Complete Mono.otf'
if test -f ~/.local/share/fonts/"$FONT_NAME"
then
	echo "[skip] Font already installed"
else
	echo "-> Installing font..."
	TMP_FONT_DIR=$(mktemp -d -t font-install-XXXXXXXXXX)
  FONT_URL=https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v1.2.0/patched-fonts/FiraCode/Regular/complete/Fura%20Code%20Regular%20Nerd%20Font%20Complete%20Mono.otf
	curl -fsSL -o ~/.local/share/fonts/"$FONT_NAME" $FONT_URL
fi

# Install tpm
if test -d ~/.tmux/plugins/tpm
then
	echo "[skip] Tpm already installed"
else
	echo "-> Installing tpm..."
  git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
fi

# Install asdf
if hash asdf &>/dev/null
then
	echo "[skip] Asdf already installed"
else
	echo "-> Installing asdf"
  git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.8
  mkdir -p ~/.config/fish/completions
  cp ~/.asdf/completions/asdf.fish ~/.config/fish/completions
fi
