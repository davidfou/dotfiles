#!/bin/bash

set -e

GITHUB_URL=https://raw.githubusercontent.com

echo "🛠️  Installing few packages..."
sudo apt install -y \
  exfat-fuse exfat-utils ubuntu-restricted-extras \
  sakura tmux

# Make Sakura as default terminal application
sudo update-alternatives --set x-terminal-emulator /usr/bin/sakura

# Install Homebrew
if hash brew &>/dev/null
then
	echo "⏩️ Homebrew already installed"
else
	echo "🛠️  Installing Homebrew..."
	HOMEBREW_URL=$GITHUB_URL/Linuxbrew/install/master/install.sh
	command -v brew >/dev/null 2>&1 || sh -c "$(curl -fsSL $HOMEBREW_URL)"
fi

# Install Fishshell and makes it the default shell
if [[ "$SHELL" =~ .*/fish ]]
then
	echo "⏩️ Fishshell already installed"
else
	echo "🛠️  Installing Fishshell..."
	brew install fish
	echo "$HOMEBREW_PREFIX/bin/fish" | sudo tee -a /etc/shells
	chsh -s "$HOMEBREW_PREFIX/bin/fish"
fi

# Install 1Password CLI and setup ssh agent
if hash op &>/dev/null
then
	echo "⏩️ 1Passwork-cli already installed"
else
	echo "🛠️  Installing 1Password-cli..."
	OP_URL=https://cache.agilebits.com/dist/1P/op/pkg/v0.8.0/op_linux_amd64_v0.8.0.zip
	TMP_OP_DIR=$(mktemp -d -t op-install-XXXXXXXXXX)
	curl -fsSL -o "${TMP_OP_DIR}/op.zip" $OP_URL
	unzip "${TMP_OP_DIR}/op.zip" -d $TMP_OP_DIR
	gpg --receive-keys 3FEF9748469ADBE15DA7CA80AC2D62742012EA22
	gpg --verify $TMP_OP_DIR/op.sig $TMP_OP_DIR/op
	sudo mv ${TMP_OP_DIR}/op /usr/bin
	echo "✍️  1Password sign-in url..."
	read OP_SIGN_IN_URL
	echo "✍️  1Password sign-in email address..."
	read OP_SIGN_IN_EMAIL
	op signin $OP_SIGN_IN_URL $OP_SIGN_IN_EMAIL
fi

# Install ssh keys
if test -f ~/.ssh/id_rsa
then
	echo "⏩️ Ssh keys already installed"
else
	echo "🛠️  Installing ssh keys..."
	op get document gkn3nrs7anhklmpom5ymh6tiza > ~/.ssh/id_rsa
	op get document 34cqtakq2rbtnf4fhlaaajpgze > ~/.ssh/id_rsa.pub
	chmod 400 ~/.ssh/id_rsa ~/.ssh/id_rsa.pub
fi

# Install SpaceVim
if test -d ~/.SpaceVim
then
	echo "⏩️ SpaceVim already installed"
else
	echo "🛠️  Installing SpaceVim..."
	curl -sLf https://spacevim.org/install.sh | bash -s -- --install neovim
fi

# Install font
FONT_NAME='Fura Code Regular Nerd Font Complete Mono.otf'
if test -f ~/.local/share/fonts/"$FONT_NAME"
then
	echo "⏩️ Font already installed"
else
	echo "🛠️ Installing font..."
	TMP_FONT_DIR=$(mktemp -d -t font-install-XXXXXXXXXX)
  FONT_URL=https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v1.2.0/patched-fonts/FiraCode/Regular/complete/Fura%20Code%20Regular%20Nerd%20Font%20Complete%20Mono.otf
	curl -fsSL -o ~/.local/share/fonts/"$FONT_NAME" $FONT_URL
fi

# Install tpm
if test -d ~/.tmux/plugins/tpm
then
	echo "⏩️ Tpm already installed"
else
	echo "🛠️  Installing tpm..."
  git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
fi

# Install python
if brew list python &> /dev/null
then
	echo "⏩️ Python already installed"
else
	echo "🛠️  Installing python"
  brew install python
fi

# Install powerline
if pip3 show powerline-status &> /dev/null
then
	echo "⏩️ Powerline already installed"
else
	echo "🛠️  Installing powerline"
  pip3 install powerline-status
fi

# Install pynvim (for neovim)
if pip3 show pynvim &> /dev/null
then
	echo "⏩️ pynvim already installed"
else
	echo "🛠️  Installing pynvim"
  pip3 install pynvim
fi

# Install yarn
if hash yarn &>/dev/null
then
	echo "⏩️ Yarn already installed"
else
	echo "🛠️  Installing yarn"
  brew install yarn
  curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.21.1
fi

# Install nvm
if test -d ~/.nvm
then
	echo "⏩️ Nvm already installed"
else
	echo "🛠️  Installing nvm"
	curl -sLf $GITHUB_URL/nvm-sh/nvm/v0.35.2/install.sh | bash
fi
