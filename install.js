
const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");
const io = require("@actions/io");
const path = require("path");

async function installKubectl(version) {
  console.log("Installing kubectl version " + version);
  const baseUrl = `https://storage.googleapis.com/kubernetes-release/release/${version}/bin/linux/amd64/kubectl`;
  const downloadPath = await download(baseUrl);
  await install(downloadPath, "kubectl");
}

async function installHelm3(version) {
  console.log("Installing helm version " + version);
  const downloadPath = await download(`https://get.helm.sh/helm-${version}-linux-amd64.tar.gz`);
  const folder = await extract(downloadPath);
  await install(`${folder}/linux-amd64/helm`, "helm");

  console.log("Installing helm plugins.")
  await exec.exec("helm plugin install https://github.com/jkroepke/helm-secrets");
  await exec.exec("helm plugin install https://github.com/databus23/helm-diff --version master");
  console.log("Helm plugins installed.")

}

async function installSops(version) {
  console.log("Install sops.");
  const sopsBaseUrl = `https://github.com/mozilla/sops/releases/download/${version}/sops-${version}.linux`;
  const sopsDownloadPath = await download(sopsBaseUrl);
  await install(sopsDownloadPath, "sops");
  console.log("sops installed.");
}

async function installHelm(version) {
  console.log("Installing helm version " + version);
  const helmBaseUrl = `https://get.helm.sh/helm-${version}-linux-amd64.tar.gz`;
  const downloadPath = await download(helmBaseUrl);
  const folder = await extract(downloadPath);
  await install(`${folder}/linux-amd64/helm`, "helm");
  console.log("Installing helm plugins.")
  await exec.exec("helm init --client-only");
  await exec.exec("helm plugin install https://github.com/futuresimple/helm-secrets");
  await exec.exec("helm plugin install https://github.com/databus23/helm-diff --version master");
  console.log("Helm plugins installed!");
}

async function extract(downloadPath) {
  const folder = await tc.extractTar(downloadPath);
  return folder;
}

async function installHelmfile(version) {
  console.log("Installing helmfile version " + version);
  const baseUrl = "https://github.com/roboll/helmfile/releases/download"
  const downloadPath = await download(`${baseUrl}/${version}/helmfile_linux_amd64`);
  await install(downloadPath, "helmfile");
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

module.exports = {
  installKubectl, installHelm, installHelm3, installHelmfile, installSops
}
