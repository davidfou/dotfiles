#!/bin/bash

set -e

sh -c "$(curl -fsLS get.chezmoi.io/lb)" -- init --apply davidfou
. "$HOME/.asdf/asdf.sh"
~/.local/bin/chezmoi apply

echo 'Done! Time to restart the machine and run `chezmoi apply`!'
