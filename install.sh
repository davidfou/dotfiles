#!/bin/bash

set -e

sh -c "$(curl -fsLS get.chezmoi.io/lb)" -- init --apply davidfou

echo 'Done! Time to restart the machine an run `chezmoi apply` in tmux!'
