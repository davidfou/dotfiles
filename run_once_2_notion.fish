#!/usr/bin/fish

if type -q notion-enhancer
  echo "[skip] Notion already installed"
  exit 0
end
echo "->  Installing Notion..."

set -l TMP_DIR (mktemp -d -t install-notion-XXXXXXXXXX)
set -l FILE_DEST $TMP_DIR/notion.deb 
 
curl -fsSL -o $FILE_DEST 'https://github.com/notion-enhancer/notion-repackaged/releases/download/v2.0.16-5/notion-app-enhanced_2.0.16-5_amd64.deb'
sudo apt install -y $FILE_DEST
 
rm -rf $TMP_DIR
