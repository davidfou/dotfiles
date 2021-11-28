#!/usr/bin/env zx

import fs from 'fs/promises';
import os from 'os';
import path from 'path';

console.log(chalk.blue(`Running run_2_zoom...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q zoom`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.log("Installing zoom...");
  console.time("Done!");

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'install-zoom-'));
  const fileDestination = path.join(tempDir, 'zoom.deb');
  try {
    await $`curl -fsSL -o ${fileDestination} 'https://zoom.us/client/latest/zoom_amd64.deb'`;
    await $`sudo apt install -y ${fileDestination}`;
  } finally {
    await fs.rm(tempDir, { recursive: true });
    console.timeEnd("Done!");
  }
}
