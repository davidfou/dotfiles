#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_homebank...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q homebank`.exitCode !== 0) {
  console.time("Done!");
  await $`sudo apt-add-repository -y ppa:mdoyen/homebank`;
  await $`sudo apt-get update`;
  await $`sudo apt install -y homebank`;
  console.timeEnd("Done!");
}
