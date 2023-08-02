const core = require('@actions/core')
const checker = require('license-checker-rseidelsohn')

const EXCLUDE_NPM_PACKAGES = ["webpack", "@types", "@babel", "k6"];

const ALLOWED_LICENSES = [
  "Artistic-2.0",
  "Apache-2.0",
  // https://github.com/gtanner/qrcode-terminal/pull/45#issuecomment-1661985667
  // Invalid non-SPDX identifier used by qrcode-terminal
  "Apache 2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "BSD*",
  "Boost",
  "BlueOak-1.0.0",
  "CC-BY-3.0",
  "CC0-1.0",
  "CNRI",
  "Custom: http://www.commonjs.org/",
  "Custom: https://docs.vuestorefront.io/",
  "Custom: https://nuxtjs.org",
  "CC-BY-4.0",
  "ISC",
  "MIT",
  "Miros",
  "Multics",
  "Naumen",
  "NTP",
  "UNKNOWN",
  "Unicode",
  "Unlicense",
  "UNLICENSED",
  "Universal",
  "Lucent",
  "LGPL-3.0",
  "Open",
  "0BSD",
  "OBSD",
  "PostgreSQ",
  "Public Domain",
  "Python-2.0",
  "Zope",
  "WTFPL"
];

async function run() {
  const projectPath = core.getInput("projectPath");
  try {
    core.info(`Checking licenses: --projectPath ${projectPath}`);
    checker.init(
      {
        start: projectPath,
        summary: true,
        excludePackagesStartingWith: EXCLUDE_NPM_PACKAGES.join(";"),
        onlyAllow: ALLOWED_LICENSES.join(";"),
      },
      (error, packages) => {
        // @ts-expect-error: the library definition is wrong
        core.info(checker.asSummary(packages));
        if (error) {
          core.setFailed(error.message);
        }
      },
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
