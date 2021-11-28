#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_insync...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q insync`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.time("Done!");
  const content = await $`chezmoi data | jq -r '"deb http://apt.insync.io/ubuntu " + .chezmoi.osRelease.versionCodename + " non-free contrib"'`;
  await $`sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ACCAF35C`;
  await $`sudo echo ${content} | sudo tee -a /etc/apt/sources.list.d/insync.list`
  await $`sudo apt-get update`;
  await $`sudo apt-get install insync`;
  console.timeEnd("Done!");
}
