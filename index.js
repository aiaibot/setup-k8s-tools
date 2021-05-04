const core = require(`@actions/core`);
const { installHelmfile, installKubectl, installHelm, installHelm3, installSops } = require("./install");

async function run() {
  try {
    installKubectl(core.getInput("kubectl-version"));

    const useHelm3 = core.getInput("use-helm3");
    if (useHelm3 === 'true') {
      installHelm3(core.getInput("helm3-version"));
      installSops(core.getInput("sops-version"));
    }
    else {
      installHelm(core.getInput("helm-version"));
    }

    installHelmfile(core.getInput("helmfile-version"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
