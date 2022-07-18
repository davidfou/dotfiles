#!/bin/bash

set -e

sudo sh -c "$(curl -fsLS chezmoi.io/get)" -- -b /usr/local/bin
chezmoi init https://github.com/davidfou/dotfiles.git
chezmoi apply
. ~/.asdf/asdf.sh
eval $(op account add --address my.1password.com --email fr.david.fournier@gmail.com --signin)
chezmoi apply

echo 'Done! Time to restart the machine an run `chezmoi apply` in tmux!'
