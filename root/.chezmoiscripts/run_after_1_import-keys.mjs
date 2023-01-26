#!/usr/bin/env zx

/**
 * How to create a new key:
 * - `gpg --full-generate-key` (create a new key)
 * - `gpg --list-keys` (get public key)
 * - `gpg --list-secret-keys --with-keygrip` (get keygrip)
 * - `gpg --list-public-keys --with-keygrip` (get keygrip2)
 * - `gpg --export-secret-key <public_key> > private.key
 * - put all the info in 1password and add the tag
 **/

console.log(chalk.blue(`Running run_1_import-keys...`));
$.verbose = false;

const generateCode = (keygrip, password) => `
const Secret = imports.gi.Secret;

const schema = new Secret.Schema(
  "org.gnupg.Passphrase",
  Secret.SchemaFlags.NONE,
  {
    "keygrip": Secret.SchemaAttributeType.STRING,
    "stored-by": Secret.SchemaAttributeType.STRING,
  }
);

const attributes = {
  "keygrip": ${JSON.stringify("n/" + keygrip)},
  "stored-by": "GnuPG Pinentry",
};

Secret.password_store_sync(
  schema,
  attributes,
  Secret.COLLECTION_DEFAULT,
  ${JSON.stringify("GnuPG: n/" + keygrip)},
  ${JSON.stringify(password)},
  null
);
`;

const keys = JSON.parse((await $`op item list --tags gpg-key --format json`).toString().trim());
for (const { id, title } of keys) {
  const publicKey = await $`op item get ${id} --fields info.public`;
  if (await $`gpg --list-keys ${publicKey}`.exitCode === 0) {
    continue;
  }
  console.log(`Installing key ${title.toString().trim()}...`)
  const password = await $`op item get ${id} --fields info.password`;
  const keygrips = [
    await $`op item get ${id} --fields info.keygrip`,
    await $`op item get ${id} --fields info.keygrip2`,
  ]
  for (const keygrip of keygrips) {
    await $`op document get ${id} | gpg --import --pinentry-mode loopback --passphrase=${password}`;
    await $`echo ${publicKey}:6: | gpg --import-ownertrust`;
    await $`gjs -c ${generateCode(keygrip.toString().trim(), password.toString().trim())}`;
  }
}
