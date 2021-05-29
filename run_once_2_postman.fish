#!/usr/bin/fish

set -l URL "https://dl.pstmn.io/download/latest/linux64"
set -l FOLDER "/opt/Postman"

if test -d $FOLDER
  echo "[skip] Postman already installed"
  exit 0
end
echo "->  Installing Postman..."

curl -fsSL $URL | sudo tar -xz -C /opt

echo > ~/.local/share/applications/postman.desktop "\
[Desktop Entry]
Name=Postman
GenericName=Postman
Exec=$FOLDER/Postman %u
Terminal=false
Icon=$FOLDER/app/resources/app/assets/icon.png
Type=Application
Categories=Application;Network;X-Developer;
Comment=Postman
StartupWMClass=Postman"
