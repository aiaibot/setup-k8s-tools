
const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");
const io = require("@actions/io");
const path = require("path");

async function installKubectl(version) {
  const baseUrl = `https://storage.googleapis.com/kubernetes-release/release/${version}/bin/linux/amd64/kubectl`;
  const downloadPath = await download(baseUrl);
  await install(downloadPath, "kubectl");
}

async function installHelm(version) {
  const baseUrl = `https://get.helm.sh/helm-${version}-linux-amd64.tar.gz`;
  const downloadPath = await download(baseUrl);
  const folder = await extract(downloadPath);
  await install(`${folder}/linux-amd64/helm`, "helm");
  await exec.exec("helm plugin install https://github.com/futuresimple/helm-secrets");
  await exec.exec("helm plugin install https://github.com/databus23/helm-diff --version master");
}

async function extract(downloadPath) {
  const folder = await tc.extractTar(downloadPath);
  return folder;
}

async function installHelmfile(version) {
  const baseUrl = "https://github.com/roboll/helmfile/releases/download"
  const downloadPath = await download(`${baseUrl}/${version}/helmfile_linux_amd64`);
  await install(downloadPath, "helmfile");
}

async function download(url) {
  console.log("Downloading from : " + url);
  const downloadPath = await tc.downloadTool(url);
  console.log("Finish downloading. : " + downloadPath);
  return downloadPath;
}

async function install(downloadPath, filename) {
  const binPath = "/home/runner/bin";
  await io.mkdirP(binPath);
  await exec.exec("chmod", ["+x", downloadPath]);
  await io.mv(downloadPath, path.join(binPath, filename));
  core.addPath(binPath);
}

module.exports = {
  installKubectl, installHelm, installHelmfile
}
