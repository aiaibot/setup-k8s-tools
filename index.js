const core = require(`@actions/core`);
const { installHelmfile, installKubectl, installHelm } = require("./install");

async function run() {
  try {
    installKubectl(core.getInput("kubectl-version"));

    const useHelm3 = core.getInput("use-helm3");
    if (useHelm3 === 'true') {
      installHelm3(core.getInput("helm3-version"));
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
