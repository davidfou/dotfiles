#!/usr/bin/env zx

import fs from 'fs/promises';
import os from 'os';
import path from 'path';

console.log(chalk.blue(`Running run_2_slack...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q slack`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.log("Installing slack...");
  console.time("Done!");

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'install-slack-'));
  const fileDestination = path.join(tempDir, 'slack.deb');
  try {
    await $`curl -fsSL -o ${fileDestination} 'https://downloads.slack-edge.com/releases/linux/4.20.0/prod/x64/slack-desktop-4.20.0-amd64.deb'`;
    await $`sudo apt-get install -y ${fileDestination}`;
  } finally {
    await fs.rm(tempDir, { recursive: true });
    console.timeEnd("Done!");
  }
}
