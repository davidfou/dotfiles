#!/bin/bash

set -e

. $HOME/.asdf/asdf.sh

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

install_plugin nodejs    https://github.com/asdf-vm/asdf-nodejs.git
install_plugin yarn      https://github.com/twuni/asdf-yarn.git
install_plugin python    https://github.com/danhper/asdf-python.git
install_plugin ruby      https://github.com/asdf-vm/asdf-ruby.git
install_plugin 1password https://github.com/samtgarson/asdf-1password.git
install_plugin kubectl   https://github.com/Banno/asdf-kubectl.git
install_plugin jq        https://github.com/ryodocx/asdf-jq.git
install_plugin java      https://github.com/halcyon/asdf-java.git
install_plugin flutter   https://github.com/oae/asdf-flutter.git
