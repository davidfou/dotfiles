#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_firefox-developer-edition...`));
$.verbose = false;

const folder = "/opt/firefox";
const url = "https://download.mozilla.org/?product=firefox-devedition-latest-ssl&os=linux64&lang=en-US";
const content = `
[Desktop Entry]
Name=Firefox Developer 
GenericName=Firefox Developer Edition
Exec=$FOLDER/firefox %u
Terminal=false
Icon=$FOLDER/browser/chrome/icons/default/default128.png
Type=Application
Categories=Application;Network;X-Developer;
Comment=Firefox Developer Edition Web Browser.
StartupWMClass=Firefox Developer Edition
`;

if (await $`[[ -d ${folder} ]]`.exitCode !== 0) {
  console.time("Done!");
  await $`curl -fsSL ${url} | sudo tar -xj -C /opt`;
  await $`echo > ~/.local/share/applications/firefox_dev.desktop ${content}`;
  console.timeEnd("Done!");
}
