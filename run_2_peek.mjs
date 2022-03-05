#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_peek...`));
$.shell = '/usr/bin/fish';
$.verbose = false;

if (await $`type -q peek`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.time("Done!");
  await $`sudo add-apt-repository ppa:peek-developers/stable`;
  await $`sudo apt-get update`;
  await $`sudo apt-get install peek`;
  console.timeEnd("Done!");
}
