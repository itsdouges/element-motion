const webpack = require('webpack');
const subdirs = require('subdirs');
const { make: makeConfig } = require('../examples/webpack.config');

const filterDirs = (dir) => {
  const parts = dir.split('/');

  if (parts.length !== 3) {
    return false;
  }

  const [,, lib] = parts;
  if (lib === 'assets') {
    return false;
  }

  return true;
};

async function build () {
  const dirs = await subdirs('./examples/', 1);
  const depthOnly = dirs.filter(filterDirs);
  const configs = depthOnly.map((dir) => makeConfig(dir.replace('examples/', '')));

  webpack(configs, (err) => {
    if (err) {
      console.error(err);
    }

    console.log('Finished!');
  });
}

build();
