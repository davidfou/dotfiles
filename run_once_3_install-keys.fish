#!/bin/fish

set -x OP_SESSION_my (op signin https://my.1password.com fr.david.fournier@gmail.com -r)

# Install ssh keys
if test -f ~/.ssh/id_rsa
then
	echo "[skip] Ssh keys already installed"
else
	echo "-> Installing ssh keys..."
	op get document gkn3nrs7anhklmpom5ymh6tiza > ~/.ssh/id_rsa
	op get document 34cqtakq2rbtnf4fhlaaajpgze > ~/.ssh/id_rsa.pub
	chmod 400 ~/.ssh/id_rsa ~/.ssh/id_rsa.pub
fi

# TODO: import GPG keys
