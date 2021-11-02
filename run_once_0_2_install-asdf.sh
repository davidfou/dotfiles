#!/bin/bash

set -e

# Install dependencies for installing python
sudo apt-get update
sudo apt-get install -y \
  build-essential libssl-dev zlib1g-dev libbz2-dev \
  libreadline-dev libsqlite3-dev wget llvm libncurses5-dev libncursesw5-dev \
  xz-utils tk-dev libffi-dev liblzma-dev

. $HOME/.asdf/asdf.sh
asdf install
