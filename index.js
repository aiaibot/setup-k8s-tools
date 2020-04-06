const core = require(`@actions/core`);
const { installHelmfile } = require("./install");

async function run() {
  try {
    installHelmfile(core.getInput("version"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
