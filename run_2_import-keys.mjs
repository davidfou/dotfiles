#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_import-keys...`));
$.verbose = false;

const keys = ["vvwkphf3plex6suh33e5dasa3q"];
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

for (const key of keys) {
  const publicKey = await $`op get item ${key} --fields info.public`;
  if (await $`gpg --list-keys ${publicKey}`.exitCode === 0) {
    continue;
  }
  const title = await $`op get item ${key} --fields title`;
  console.log(`Installing key ${title.toString().trim()}...`)
  const password = await $`op get item ${key} --fields info.password`;
  const keygrips = [
    await $`op get item ${key} --fields info.keygrip`,
    await $`op get item ${key} --fields info.keygrip2`,
  ]
  for (const keygrip of keygrips) {
    await $`op get document ${key} | gpg --import --pinentry-mode loopback --passphrase=${password}`;
    await $`echo ${publicKey}:6: | gpg --import-ownertrust`;
    await $`gjs -c ${generateCode(keygrip.toString(), password.toString())}`;
  }
}
