#!/usr/bin/fish

set -l URL "https://download.mozilla.org/?product=firefox-devedition-latest-ssl&os=linux64&lang=en-US"
set -l FOLDER "/opt/firefox"

if test -d $FOLDER
  echo "[skip] Firefox Developer Edition already installed"
  exit 0
end
echo "->  Installing Firefox Developer Edition..."

curl -fsSL $URL | sudo tar -xj -C /opt

echo > ~/.local/share/applications/firefox_dev.desktop "\
[Desktop Entry]
Name=Firefox Developer 
GenericName=Firefox Developer Edition
Exec=$FOLDER/firefox %u
Terminal=false
Icon=$FOLDER/browser/chrome/icons/default/default128.png
Type=Application
Categories=Application;Network;X-Developer;
Comment=Firefox Developer Edition Web Browser.
StartupWMClass=Firefox Developer Edition"
