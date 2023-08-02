const core = require('@actions/core')
const { parseDependencyTree, parseCircular, prettyCircular } = require("dpdm");

async function run() {
  try {
    const filesPath = core.getInput("filesPath");
    const tree = await parseDependencyTree(filesPath, {});
    const circulars = parseCircular(tree);

    if (circulars.length > 0) {
      core.warning(`Detected ${circulars.length} circular dependencies between the files`);
      core.info(prettyCircular(circulars));
    } else {
      core.info("No circular dependencies");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
