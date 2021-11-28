#!/usr/bin/env zx

import fs from 'fs/promises';
import os from 'os';
import path from 'path';

console.log(chalk.blue(`Running run_2_docker-credential-pass...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

try {
  await fs.writeFile(path.join(os.homedir(), '.docker/config.json'), JSON.stringify({ credsStore: 'pass'}, null, 2), { flag: 'wx'})
} catch (error) {
  if (error.code !== 'EEXIST') {
    throw error;
  }
}

const response = await fetch('https://api.github.com/repos/docker/docker-credential-helpers/releases/latest');
if (!response.ok) {
  throw new Error('A problem occurred to get the latest version');
}
const info = await response.json();
const { tag_name: latestVersion } = info;
const { browser_download_url: url } = info.assets.find(({ name }) => name === `docker-credential-pass-${latestVersion}-amd64.tar.gz`);

let shouldInstall = false;
if (await $`type -q docker-credential-pass`.exitCode !== 0) {
  shouldInstall = true;
  await $`pass init "B8BA7C24F96E4D86077FBBC93649048A5874EACE"`;
  const command = $`pass insert -e docker-credential-helpers/docker-pass-initialized-check`;
  command.stdin.write("pass is initialized\n");
  await command
} else {
  const { stdout: currentVersion } = await $`/usr/local/bin/docker-credential-pass version`;
  shouldInstall = `v${currentVersion.trim()}` !== latestVersion;
}


if (shouldInstall) {
  $.shell = '/usr/bin/bash';
  console.time("Done!");
  await $`sudo rm -rf /usr/local/bin/docker-credential-pass`;
  await $`curl -fsSL ${url} | sudo tar -x -z -C /usr/local/bin`;
  const userInfo = os.userInfo();
  await $`sudo chown ${userInfo.uid}:${userInfo.gid} /usr/local/bin/docker-credential-pass`
  await $`chmod u+x /usr/local/bin/docker-credential-pass`;
  console.timeEnd("Done!");
}
