#!/usr/bin/env zx

import path from 'path';

// https://github.com/zsa/wally/wiki/Live-training-on-Linux
// https://github.com/zsa/wally/wiki/Linux-install
console.log(chalk.blue(`Running run_after_2_oryx...`));
$.verbose = false;

const FILE_PATH = '/etc/udev/rules.d/50-oryx.rules';
const CONTENT = `
# Rule for the Ergodox EZ
SUBSYSTEM=="usb", ATTR{idVendor}=="feed", ATTR{idProduct}=="1307", GROUP="plugdev"

# Teensy rules for the Ergodox EZ
ATTRS{idVendor}=="16c0", ATTRS{idProduct}=="04[789B]?", ENV{ID_MM_DEVICE_IGNORE}="1"
ATTRS{idVendor}=="16c0", ATTRS{idProduct}=="04[789A]?", ENV{MTP_NO_PROBE}="1"
SUBSYSTEMS=="usb", ATTRS{idVendor}=="16c0", ATTRS{idProduct}=="04[789ABCD]?", MODE:="0666"
KERNEL=="ttyACM*", ATTRS{idVendor}=="16c0", ATTRS{idProduct}=="04[789B]?", MODE:="0666"
`.trim();
const BIN_URL = 'https://configure.ergodox-ez.com/wally/linux';
const OUTPUT = path.join(process.env.HOME, '.local/bin/wally');

if (await $`test -f ${FILE_PATH}`.exitCode !== 0) {
  console.log("Installing oryx...");
  console.time("Done!");
  await $`echo ${CONTENT} | sudo tee ${FILE_PATH}`;
  await $`sudo usermod -aG plugdev $USER`;

  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y libusb-1.0-0-dev`;

  await $`sudo curl -fsSL -o ${OUTPUT} ${BIN_URL}`;
  await $`chmod u+x ${OUTPUT}`
  console.timeEnd("Done!");
}
