#!/usr/bin/env zx

console.log(chalk.blue(`Running run_2_flatpak...`));
$.verbose = false;

console.time("Done!");

await $`flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`;

const applications = [
  "fr.free.Homebank",
  "com.slack.Slack",
  "com.spotify.Client",
  "com.valvesoftware.Steam",
  "us.zoom.Zoom",
  "io.dbeaver.DBeaverCommunity",
  "com.getpostman.Postman",
  "com.uploadedlobster.peek",
  "org.chromium.Chromium",
  "org.signal.Signal",
];
await $`flatpak install flathub -y ${applications}`;

console.timeEnd("Done!");
