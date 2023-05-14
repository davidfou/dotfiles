#!/usr/bin/env zx

console.log(chalk.blue(`Running run_3_dbeaver-config...`));
$.verbose = false;

console.time("Done!");
const FOLDER = path.join(
  os.homedir(),
  ".local/share/DBeaverData/workspace6/General/.dbeaver"
);
const FILENAME = path.join(FOLDER, "data-sources-cumul.json");
const BACKUP = path.join(FOLDER, `data-sources-cumul-${Date.now()}.json.bak`);

if (!(await fs.pathExists(FOLDER))) {
  throw new Error("Dbeaver directory doesn't exist");
}

if (await fs.pathExists(FILENAME)) {
  await fs.move(FILENAME, BACKUP);
}

const configurations = JSON.parse((await $`op item list --tags dbeaver --format json`).toString().trim());
const connections = Object.fromEntries(configurations.map(({ id }) => {
  return [id, {
    provider: `op://Personal/${id}/dbeaver/provider`,
    driver: `op://Personal/${id}/dbeaver/driver`,
    name: `op://Personal/${id}/dbeaver/name`,
    "save-password": true,
    folder: `op://Personal/${id}/dbeaver/folder`,
    configuration: {
      host: `op://Personal/${id}/server`,
      port: `op://Personal/${id}/port`,
      database: `op://Personal/${id}/database`,
      user: `op://Personal/${id}/username`,
      password: `op://Personal/${id}/password`,
      "type": `op://Personal/${id}/dbeaver/type`,
    }

  }]
}));

await $`echo ${JSON.stringify({ connections }, null, 2)} | op inject -o ${FILENAME}`;

console.timeEnd("Done!");
