set -e

systemctl stop packagekit
sudo sh -c "$(curl -fsLS http://git.io/chezmoi)" -- -b /usr/local/bin
chezmoi cd
chezmoi init https://github.com/davidfou/dotfiles.git
chezmoi apply
. ~/.asdf/asdf.sh
eval $(op signin my.1password.com fr.david.fournier@gmail.com)
chezmoi apply

echo 'Done! Time to restart the machine an run `chezmoi apply` in tmux!'
