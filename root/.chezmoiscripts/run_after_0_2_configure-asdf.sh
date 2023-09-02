#!/bin/bash

set -e

blue=`tput setaf 4`
reset=`tput sgr0`
echo "${blue}Running run_0_2_configure-asdf...${reset}"

install_plugin () {
  set +e
  $(asdf list $1 > /dev/null 2>&1)
  is_installed=$?
  set -e
  if [ $is_installed -eq 0 ]
  then
    echo "[skip] asdf plugin $1 already installed"
  else
    echo "->  Installing $1 asdf plugin..."
    asdf plugin add $1 $2
  fi
}

. ~/.asdf/asdf.sh
install_plugin nodejs        https://github.com/asdf-vm/asdf-nodejs.git
install_plugin yarn          https://github.com/twuni/asdf-yarn.git
install_plugin python        https://github.com/asdf-community/asdf-python.git
install_plugin ruby          https://github.com/asdf-vm/asdf-ruby.git
install_plugin 1password-cli https://github.com/NeoHsu/asdf-1password-cli.git
install_plugin kubectl       https://github.com/asdf-community/asdf-kubectl
install_plugin jq            https://github.com/AZMCode/asdf-jq.git
install_plugin java          https://github.com/halcyon/asdf-java.git
install_plugin flutter       https://github.com/oae/asdf-flutter.git
install_plugin awscli        https://github.com/MetricMike/asdf-awscli.git
install_plugin dive          https://github.com/looztra/asdf-dive
install_plugin rust          https://github.com/asdf-community/asdf-rust.git
install_plugin neovim        https://github.com/richin13/asdf-neovim
install_plugin azure-cli     https://github.com/itspngu/asdf-azure-cli
install_plugin pulumi        https://github.com/canha/asdf-pulumi.git
install_plugin golang        https://github.com/kennyp/asdf-golang.git
install_plugin github-cli    https://github.com/bartlomiejdanek/asdf-github-cli.git
install_plugin firebase      https://github.com/jthegedus/asdf-firebase.git
install_plugin bitwarden     https://github.com/vixus0/asdf-bitwarden.git
