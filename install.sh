#!/bin/bash

set -e

sudo sh -c "$(curl -fsLS chezmoi.io/get)" -- -b /usr/local/bin
chezmoi init https://github.com/davidfou/dotfiles.git
chezmoi apply --include files
chezmoi apply --include scripts
. ~/.asdf/asdf.sh
eval $(op signin my.1password.com fr.david.fournier@gmail.com)
chezmoi apply --include files
chezmoi apply --include scripts

echo 'Done! Time to restart the machine an run `chezmoi apply` in tmux!'
