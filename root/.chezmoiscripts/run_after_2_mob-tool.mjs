#!/usr/bin/env zx

console.log(chalk.blue(`Running run_after_2_mob-tool...`));
$.verbose = false;
$.shell = '/usr/bin/fish';

if (await $`type -q mob`.exitCode !== 0) {
  console.time("Done!");
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y espeak-ng-espeak mbrola-us1`;
  await $`curl -sL install.mob.sh | sh -s - --user`;
  console.timeEnd("Done!");
}
