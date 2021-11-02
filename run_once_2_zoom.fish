#!/usr/bin/fish

if type -q zoom
  echo "[skip] Zoom already installed"
  exit 0
end
echo "->  Installing Zoom..."

set -l TMP_DIR (mktemp -d -t install-zoom-XXXXXXXXXX)
set -l FILE_DEST $TMP_DIR/zoom_amd64.deb 
 
curl -fsSL -o $FILE_DEST 'https://zoom.us/client/latest/zoom_amd64.deb'
sudo apt install -y $FILE_DEST
 
rm -rf $TMP_DIR
