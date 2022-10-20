#!/usr/bin/env zx

console.log(chalk.blue(`Running run_1_install-docker...`))
$.verbose = false;

const stepFile = await $`chezmoi data | jq -r '.chezmoi.workingTree + "/.steps/step3"'`;

if (await $`test -f ${stepFile}`.exitCode !== 0) {
  // Instructions comming from https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
  console.log("Installing some packages...");
  console.time("Done!");
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 remove -y docker docker.io containerd runc`
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  const packages = [
    "ca-certificates",
    "curl",
    "gnupg",
    "lsb-release",
  ];
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y ${packages}`;

  await $`sudo mkdir -p /etc/apt/keyrings`;
  await $`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`;
  const architecture = await $`dpkg --print-architecture`;
  const release = await $`lsb_release -cs`;
  await $`echo "deb [arch=${architecture} signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${release} stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`;

  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin`;
  await $`sudo service docker start`;
  await $`sudo systemctl enable docker.service`;
  await $`sudo systemctl enable containerd.service`;
  await $`sudo usermod -aG docker $USER`;

  await $`touch ${stepFile}`;
  console.timeEnd("Done!");
}
