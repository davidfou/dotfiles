#!/bin/fish

asdf plugin add nodejs    https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin add yarn      https://github.com/twuni/asdf-yarn.git
asdf plugin add python    https://github.com/danhper/asdf-python.git
asdf plugin add ruby      https://github.com/asdf-vm/asdf-ruby.git
asdf plugin add 1password https://github.com/samtgarson/asdf-1password.git

bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

asdf install
