
const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");
const io = require("@actions/io");
const path = require("path");

async function installKubectl(version) {
  const installed = await isInstalled("kubectl");
  if (installed) {
    console.log("kubectl is already installed")
    return;
  }
  console.log("Installing kubectl version " + version);
  const baseUrl = `https://storage.googleapis.com/kubernetes-release/release/${version}/bin/linux/amd64/kubectl`;
  const downloadPath = await download(baseUrl);
  await install(downloadPath, "kubectl");
}

async function installHelm(version) {
  const installed = await isInstalled("helm");
  if (installed) {
    console.log("helm is already installed")
    return;
  }
  console.log("Installing helm version " + version);
  const downloadPath = await download(`https://get.helm.sh/helm-${version}-linux-amd64.tar.gz`);
  const folder = await extract(downloadPath);
  await install(`${folder}/linux-amd64/helm`, "helm");

  console.log("Installing helm plugins.")
  let retryCounter = 10;
  let pluginInstalled = false;
  do {
    try {
      await exec.exec("helm plugin install https://github.com/jkroepke/helm-secrets --version v3.15.0");
      pluginInstalled = true;
    }
    catch (error) {
      console.log(error);
      retryCounter --;
    }
  } while (!pluginInstalled && retryCounter > 0);

  retryCounter = 10;
  pluginInstalled = false;
  do {
    try {
      await exec.exec("helm plugin install https://github.com/databus23/helm-diff --version master");
      pluginInstalled = true;
    }
    catch (error) {
      console.log(error);
      retryCounter --;
    }
  } while (!pluginInstalled && retryCounter > 0);
  console.log("Helm plugins installed.")

}

async function installSops(version) {
  const installed = await isInstalled("sops");
  if (installed) {
    console.log("sops is already installed")
    return;
  }
  console.log("Install sops.");
  const sopsBaseUrl = `https://github.com/mozilla/sops/releases/download/${version}/sops-${version}.linux`;
  const sopsDownloadPath = await download(sopsBaseUrl);
  await install(sopsDownloadPath, "sops");
  console.log("sops installed.");
}

async function extract(downloadPath) {
  const folder = await tc.extractTar(downloadPath);
  return folder;
}

async function installHelmfile(version) {
  const installed = await isInstalled("helmfile");
  if (installed) {
    console.log("helmfile is already installed")
    return;
  }
  console.log("Installing helmfile version " + version);
  const baseUrl = "https://github.com/helmfile/helmfile/releases/download"
  // Caution!!
  // URL: In the path, there is a "v" before the version number. But in the filename, there is no "v" before the version number.
  // https://github.com/helmfile/helmfile/releases/download/v0.165.0/helmfile_0.165.0_linux_amd64.tar.gz
  const downloadPath = await download(`${baseUrl}/v${version}/helmfile_${version}_linux_amd64.tar.gz`);
  const folder = await extract(downloadPath);
  await install(`${folder}/helmfile`, "helmfile");
}

async function download(url) {
  console.log("Downloading from: " + url);
  const downloadPath = await tc.downloadTool(url);
  console.log("Finish downloading: " + downloadPath);
  return downloadPath;
}

async function install(downloadPath, filename) {
  const binPath = "/home/runner/bin";
  await io.mkdirP(binPath);
  await exec.exec("chmod", ["+x", downloadPath]);
  await io.cp(downloadPath, path.join(binPath, filename));
  core.addPath(binPath);
}

async function isInstalled(tool) {
  console.log("Checking if " + tool + " is installed");
  try {
    await exec.exec("command -v " + tool);
    console.log(tool + " is installed");
    return true;
  } catch (error) {
    console.log(tool + " is not installed");
    return false;
  }
}

module.exports = {
  installKubectl, installHelm, installHelmfile, installSops
}
