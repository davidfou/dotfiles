#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_ngrok...`))
$.shell = '/usr/bin/fish';
$.verbose = false;

if (await $`type -q ngrok`.exitCode !== 0) {
  $.shell = '/usr/bin/bash';
  console.log("Installing ngrok...");
  console.time("Done!");
  await $`curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null`;
  await $`echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list`;
  await $`sudo apt-get update`;
  await $`sudo apt-get install -y ngrok`;
  const token = await $`op get item "dissohgy55byxfie3l4zq5w6me" --fields token`;
  await $`ngrok authtoken ${token}`;
  console.timeEnd("Done!");
}
