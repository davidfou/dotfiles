#!/usr/bin/fish

set -l TMP_DIR (mktemp -d -t ci-XXXXXXXXXX)
set -l FILE_DEST $TMP_DIR/zoom_amd64.deb 
 
if type -q zoom
  echo "[skip] Zoom already installed"
  exit 0
end
echo "->  Installing Zoom..."

curl -fsSL -o $FILE_DEST https://zoom.us/client/latest/zoom_amd64.deb
sudo apt install $FILE_DEST
 
rm -rf $TMP_DIR
