// Assumption: We run in the "version" npm script.

const { version } = require('../package.json');
const { exec } = require('child_process');

function handleErr (err, stderr, stdout) {
  if (error) {
    console.error(error);
    process.exit(1);
    return;
  }

  console.log(stderr);
  console.log(stdout);
}

exec(`lerna publish --yes --skip-npm --skip-git --force-publish=* --repo-version=${version}`, (error, stdout, stderr) => {
  handleErr(error, stderr, stdout);
  exec(`git add .`, handleErr);
});
