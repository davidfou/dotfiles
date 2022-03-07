#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_notion...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q notion-app-enhanced`.exitCode !== 0) {
  console.log("Installing notion...");
  console.time("Done!");

  await $`echo "deb [trusted=yes] https://apt.fury.io/notion-repackaged/ /" | sudo tee /etc/apt/sources.list.d/notion-repackaged.list`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y notion-app-enhanced`;
  console.timeEnd("Done!");
}
