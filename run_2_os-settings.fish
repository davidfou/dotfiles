#!/usr/bin/fish

dconf write /org/gnome/desktop/peripherals/touchpad/natural-scroll true 
dconf write /org/gnome/desktop/interface/clock-format "'24h'"
dconf write /org/gnome/desktop/input-sources/sources "[('xkb', 'us+mac')]"
dconf write /org/gnome/desktop/input-sources/xkb-options "['lv3:lalt_switch', 'lv3:ralt-alt']"
