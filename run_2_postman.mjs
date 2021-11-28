#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_postman...`));
$.verbose = false;

const folder = "/opt/Postman";
const url = "https://dl.pstmn.io/download/latest/linux64";
const content = `
[Desktop Entry]
Name=Postman
GenericName=Postman
Exec=$FOLDER/Postman %u
Terminal=false
Icon=$FOLDER/app/resources/app/assets/icon.png
Type=Application
Categories=Application;Network;X-Developer;
Comment=Postman
StartupWMClass=Postman`;

if (await $`[[ -d ${folder} ]]`.exitCode !== 0) {
  $.shell = '/usr/bin/fish';
  console.log("Installing postman...");
  console.time("Done!");
  await $`curl -fsSL ${url} | sudo tar -xj -C /opt`;
  await $`echo > ~/.local/share/applications/postman.desktop ${content}`;
  console.timeEnd("Done!");
}
