#!/usr/bin/fish

if type -q slack
  echo "[skip] Slack already installed"
  exit 0
end
echo "->  Installing Slack..."

set -l TMP_DIR (mktemp -d -t install-slack-XXXXXXXXXX)
set -l FILE_DEST $TMP_DIR/slack.deb 
 
curl -fsSL -o $FILE_DEST 'https://downloads.slack-edge.com/releases/linux/4.20.0/prod/x64/slack-desktop-4.20.0-amd64.deb'
sudo apt install -y $FILE_DEST
 
rm -rf $TMP_DIR
