#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_1password...`));
$.shell = '/usr/bin/fish';
$.verbose = false;

if (await $`type -q 1password`.exitCode !== 0) {
  console.log("Installing 1password...");
  console.time("Done!");

  await $`curl -sS https://downloads.1password.com/linux/keys/1password.asc | sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg`;
  const architecture = await $`dpkg --print-architecture`;
  await $`echo 'deb [arch=${architecture} signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/amd64 stable main' | sudo tee /etc/apt/sources.list.d/1password.list`;
  await $`sudo mkdir -p /etc/debsig/policies/AC2D62742012EA22/`;
  await $`curl -sS https://downloads.1password.com/linux/debian/debsig/1password.pol | sudo tee /etc/debsig/policies/AC2D62742012EA22/1password.pol`;
  await $`sudo mkdir -p /usr/share/debsig/keyrings/AC2D62742012EA22`;
  await $`curl -sS https://downloads.1password.com/linux/keys/1password.asc | sudo gpg --dearmor --output /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg`;

  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y 1password`;

  console.timeEnd("Done!");
}
