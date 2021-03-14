#!/bin/bash

set -e

if hash homebank &>/dev/null
then
  echo "[skip] Homebank already installed"
else
  echo "-> Installing Homebank..."
  sudo apt-add-repository -y ppa:mdoyen/homebank
  sudo apt-get update
  sudo apt install -y homebank
fi
