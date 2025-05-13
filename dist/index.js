/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 220:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


const core = __nccwpck_require__(859);
const tc = __nccwpck_require__(793);
const exec = __nccwpck_require__(577);
const io = __nccwpck_require__(458);
const path = __nccwpck_require__(928);

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
  try {
    await exec.exec("command -v " + tool);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  installKubectl, installHelm, installHelmfile, installSops
}


/***/ }),

/***/ 859:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 577:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 458:
/***/ ((module) => {

module.exports = eval("require")("@actions/io");


/***/ }),

/***/ 793:
/***/ ((module) => {

module.exports = eval("require")("@actions/tool-cache");


/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(859);
const { installHelmfile, installKubectl, installHelm, installSops } = __nccwpck_require__(220);

async function run() {
  try {
    installKubectl(core.getInput("kubectl-version"));

    installHelm(core.getInput("helm-version"));
    installSops(core.getInput("sops-version"));

    installHelmfile(core.getInput("helmfile-version"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = __webpack_exports__;
/******/ })()
;