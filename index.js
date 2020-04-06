const core = require(`@actions/core`);
const { installHelmfile, installKubectl, installHelm } = require("./install");

async function run() {
  try {
    installKubectl(core.getInput("kubectl-version"));
    installHelm(core.getInput("helm-version"));
    installHelmfile(core.getInput("helmfile-version"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
