#!/usr/bin/fish

dconf write /org/gnome/desktop/peripherals/touchpad/natural-scroll true 
dconf write /org/gnome/desktop/interface/clock-format "'24h'"
dconf write /org/gnome/desktop/input-sources/sources "[('xkb', 'us+mac')]"
dconf write /org/gnome/desktop/input-sources/xkb-options "['lv3:lalt_switch', 'lv3:ralt-alt']"

sudo update-locale LANG=en_US.UTF-8
sudo update-locale LC_MONETARY=fr_FR.UTF-8
sudo update-locale LC_NUMERIC=fr_FR.UTF-8
sudo update-locale LC_TIME=fr_FR.UTF-8
sudo update-locale LC_PAPER=fr_FR.UTF-8
sudo update-locale LC_NAME=fr_FR.UTF-8
sudo update-locale LC_ADDRESS=fr_FR.UTF-8
sudo update-locale LC_TELEPHONE=fr_FR.UTF-8
sudo update-locale LC_MEASUREMENT=fr_FR.UTF-8
sudo update-locale LC_IDENTIFICATION=fr_FR.UTF-8
