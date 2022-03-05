# Davidfou's dotfiles

## Setup

```sh
bash
sudo sh -c "$(curl -fsLS http://git.io/chezmoi)" -- -b /usr/local/bin
chezmoi cd
chezmoi init https://github.com/davidfou/dotfiles.git
chezmoi apply \
  ~/.tool-versions \
  ~/.gitconfig \
  ~/.default-gems \
  ~/.default-npm-packages \
  ~/.default-python-packages
chezmoi apply
. ~/.asdf/asdf.sh 
eval $(op signin my.1password.com fr.david.fournier@gmail.com)
chezmoi apply
# Logout and run one more time chezmoi apply in tmux
```
