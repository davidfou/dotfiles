# Davidfou's dotfiles

## Setup

```sh
bash
snap install chezmoi --classic
chezmoi cd
chezmoi init https://github.com/davidfou/dotfiles.git
chezmoi apply
eval $(op signin my.1password.com)
chezmoi apply
# Logout and run one more time chezmoi apply
```
