#!/usr/bin/env zx

import os from "os";

/**
 * How to create a new key:
 * - `gpg --full-generate-key` (create a new key)
 * - `gpg --list-keys` (get public key)
 * - `gpg --list-secret-keys --with-keygrip` (get keygrip)
 * - `gpg --list-public-keys --with-keygrip` (get keygrip2)
 * - `gpg --export-secret-key <public_key> > private.key
 * - put all the info in 1password and add the tag
 **/

console.log(chalk.blue(`Running run_after_1_import-keys...`));
$.verbose = false;

const keys = JSON.parse(
  (await $`op item list --tags gpg-key --format json`).toString().trim(),
);
for (const { id, title } of keys) {
  const publicKey = await $`op item get ${id} --fields info.public`;
  if ((await $`gpg --list-keys ${publicKey}`.exitCode) === 0) {
    continue;
  }
  console.log(`Installing key ${title.toString().trim()}...`);
  const password = await $`op item get ${id} --fields info.password --reveal`;
  await $`op document get ${id} | gpg --import --pinentry-mode loopback --passphrase ${password}`;
  await $`echo ${publicKey}:6: | gpg --import-ownertrust`;

  if (os.platform() === "darwin") {
    const keygrip = await $`op item get ${id} --fields info.keygrip --reveal`;
    await $`security add-generic-password -a ${keygrip} -s "GnuPG" -w ${password} -l ${title} -T "" -T "/opt/homebrew/bin/pinentry-mac"`;
  }
}
