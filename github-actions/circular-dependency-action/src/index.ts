import * as core from '@actions/core';
const { parseDependencyTree, parseCircular, prettyCircular } = require('dpdm');

try {
  const filesPath = core.getInput('filesPath');
  parseDependencyTree(filesPath, {}).then((tree: any) => {
    const circulars = parseCircular(tree);
    core.info(prettyCircular(circulars));
  });
} catch (error) {
  core.setFailed(error.message);
}