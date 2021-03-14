#!/usr/bin/fish

set -l VERSION "1.4.3"
set -l VERSION_HASH "48f7dfd"
set -l URL "https://github.com/Studio3T/robomongo/releases/download/v$VERSION/robo3t-$VERSION-linux-x86_64-$VERSION_HASH.tar.gz"
set -l ICON_URL "https://raw.githubusercontent.com/Studio3T/robomongo/master/src/robomongo/gui/resources/icons/logo-256x256.png"
set -l FOLDER "/opt/robo3t"

if test -d $FOLDER
  echo "[skip] Robo3t already installed"
  exit 0
end
echo "->  Installing Robo3t..."

curl -fsSL $URL | sudo tar -xz -C /opt
sudo mv /opt/robo3t-$VERSION-linux-x86_64-$VERSION_HASH $FOLDER
sudo curl -fsSL -o $FOLDER/icon.png $ICON_URL

echo > ~/.local/share/applications/robo3t.desktop "\
[Desktop Entry]
Encoding=UTF-8
Type=Application
Name=Robo3t
Icon=$FOLDER/icon.png
Exec="$FOLDER/bin/robo3t"
Comment=Robo3t 
Categories=Development;
Terminal=false
StartupNotify=true"
