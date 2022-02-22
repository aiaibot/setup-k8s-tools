const core = require(`@actions/core`);
const { installHelmfile, installKubectl, installHelm, installSops } = require("./install");

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
