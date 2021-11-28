#!/usr/bin/env zx

import fs from 'fs/promises';
import os from 'os';
import path from 'path';

console.log(chalk.blue(`Running run_2_notion...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q notion-app-enhanced`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.log("Installing notion...");
  console.time("Done!");

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'install-notion-'));
  const fileDestination = path.join(tempDir, 'notion.deb');
  try {
    await $`curl -fsSL -o ${fileDestination} 'https://github.com/notion-enhancer/notion-repackaged/releases/download/v2.0.16-5/notion-app-enhanced_2.0.16-5_amd64.deb'`;
    await $`sudo apt install -y ${fileDestination}`;
  } finally {
    await fs.rm(tempDir, { recursive: true });
    console.timeEnd("Done!");
  }
}
