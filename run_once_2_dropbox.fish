#!/usr/bin/fish

set -e

if type -q dropbox
  echo "[skip] Dropbox already installed"
  exit 0
end
echo "->  Installing Dropbox..."

set -l TMP_DIR (mktemp -d -t install-dropbox-XXXXXXXXXX)
set -l FILE_DEST $TMP_DIR/dropbox_amd64.deb 

curl -fsSL -o $FILE_DEST 'https://www.dropbox.com/download?dl=packages/ubuntu/dropbox_2020.03.04_amd64.deb'
sudo apt install $FILE_DEST
 
rm -rf $TMP_DIR
