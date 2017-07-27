// Assumption: We run in the "version" npm script.

const { version } = require('../package.json');
const { exec } = require('child_process');

exec(`lerna publish --yes --skip-npm --skip-git --force-publish=* --repo-version=${version}`, (error, stdout, stderr) => {
  if (error || stderr) {
    console.error(error || stderr);
    process.exit(1);
    return;
  }

  console.log(stdout);
  process.exit(0);
});
