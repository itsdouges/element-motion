const pkg = require('./packages/yubaba/package.json');

module.exports = {
  title: 'yubaba 🧙✨',
  description: `yubaba ${pkg.description}`,
  typescript: true,
  dest: '/docs',
  codeSandbox: false,
  notUseSpecifiers: true,
  filterComponents: files => files.filter(filepath => /([^d]\.tsx?)$/.test(filepath)),
  themeConfig: {
    colors: {
      primary: '#468cee',
    },
  },
};
