#!/usr/bin/fish

chezmoi git remote remove origin
chezmoi git remote add origin git@github.com:davidfou/dotfiles.git
chezmoi git remote branch -u origin/master
