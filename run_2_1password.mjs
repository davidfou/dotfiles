#!/usr/bin/env zx

import fs from 'fs/promises';
import os from 'os';
import path from 'path';

console.log(chalk.blue(`Running run_2_1password...`));
$.shell = '/usr/bin/fish';
$.verbose = false;

if (await $`type -q 1password`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.log("Installing 1password...");
  console.time("Done!");

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'install-1password-'));
  const fileDestination = path.join(tempDir, '1password.deb');
  try {
    await $`curl -fsSL -o ${fileDestination} 'https://downloads.1password.com/linux/debian/amd64/stable/1password-latest.deb'`;
    await $`sudo apt-get install -y ${fileDestination}`;
  } finally {
    await fs.rm(tempDir, { recursive: true });
    console.timeEnd("Done!");
  }
}
