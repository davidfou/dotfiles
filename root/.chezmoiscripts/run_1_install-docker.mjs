#!/usr/bin/env zx

console.log(chalk.blue(`Running run_1_install-docker...`))
$.verbose = false;

const stepFile = await $`chezmoi data | jq -r '.chezmoi.workingTree + "/.steps/step3"'`;

const installDockerCompose = async (version = 'v2.2.3') => {
  const kernelName = await $`uname -s`;
  const machine = await $`uname -m`;
  await $`sudo curl -L "https://github.com/docker/compose/releases/download/${version}/docker-compose-${kernelName}-${machine}" -o /usr/local/bin/docker-compose`;
  await $`sudo chmod +x /usr/local/bin/docker-compose`;
};

if (await $`test -f ${stepFile}`.exitCode !== 0) {
  // Instructions comming from https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
  console.log("Installing some packages...");
  console.time("Done!");
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 remove -y docker docker.io containerd runc`
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  const packages = [
    "pass",
    "ca-certificates",
    "curl",
    "gnupg",
    "lsb-release",
    "uidmap",
  ];
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y ${packages}`;

  await $`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`;
  const architecture = await $`dpkg --print-architecture`;
  const release = await $`lsb_release -cs`;
  await $`echo "deb [arch=${architecture} signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu ${release} stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`;

  await $`sudo apt-get -o DPkg::Lock::Timeout=60 update`;
  await $`sudo apt-get -o DPkg::Lock::Timeout=60 install -y docker-ce docker-ce-cli containerd.io`;

  // Instructions coming from https://docs.docker.com/engine/security/rootless/
  await $`sudo systemctl disable --now docker.service docker.socket`;
  await $`dockerd-rootless-setuptool.sh install`;

  await installDockerCompose();

  await $`touch ${stepFile}`;
  console.timeEnd("Done!");
}

// TODO: check for update on docker-compose
