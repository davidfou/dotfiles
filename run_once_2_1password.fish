#!/usr/bin/fish

if type -q 1password
  echo "[skip] 1password already installed"
  exit 0
end
echo "->  Installing 1password..."

set -l TMP_DIR (mktemp -d -t install-1password-XXXXXXXXXX)
set -l FILE_DEST $TMP_DIR/1password.deb 
 
curl -fsSL -o $FILE_DEST 'https://downloads.1password.com/linux/debian/amd64/stable/1password-latest.deb'
sudo apt install -y $FILE_DEST
 
rm -rf $TMP_DIR
