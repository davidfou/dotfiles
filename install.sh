#!/bin/bash

set -e

sh -c "$(curl -fsLS get.chezmoi.io/lb)" -- init --apply davidfou
export PATH=/opt/homebrew/bin:$HOME/.local/bin:$PATH
eval "$(mise activate bash)"
~/.local/bin/chezmoi apply

echo 'Done! Time to restart the machine and run `chezmoi apply`!'
