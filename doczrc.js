const pkg = require('./packages/yubaba/package.json');
const { css } = require('styled-components'); // eslint-disable-line

const primary = 'rgb(133, 47, 255)';
const altPrimary = 'rgba(200, 57, 236, 1)';
const primaryText = 'rgba(255, 255, 255, 0.95)';
const background = `linear-gradient(135deg, ${altPrimary} 25%, ${primary} 100%)`;

module.exports = {
  title: `yubaba ${pkg.description}`,
  description: `yubaba ${pkg.description}`,
  typescript: true,
  dest: '/docs',
  codeSandbox: false,
  notUseSpecifiers: true,
  filterComponents: files => files.filter(filepath => /([^d]\.tsx?)$/.test(filepath)),
  themeConfig: {
    colors: {
      primary,
      sidebarBg: background,
      sidebarText: primaryText,
      sidebarPrimary: primaryText,
      sidebarBorder: 'transparent',
      link: primary,
    },
    styles: {
      body: css`
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        line-height: 1.6;

        input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        div[class^='Logo__Wrapper-'] {
          ::before {
            display: none;
          }
        }

        div[class^='Sidebar__Footer-'] {
          display: none;
        }

        a[class^='MenuLink__LinkAnchor-'],
        a[class^='MenuLink__createLink-'] {
          font-weight: 400;

          :hover,
          :focus {
            font-weight: 600;
          }
        }

        a[class^='SmallLink__Link'] {
          opacity: 0.65;

          :hover,
          :focus {
            opacity: 0.9;
          }
        }
      `,
      h1: css`
        display: inline-block;
        margin: 60px 0 20px;
        font-size: 48px;
        font-weight: 600;
        letter-spacing: -0.06em;
        color: ${primaryText};
        position: relative;
        z-index: 1;

        :after {
          position: absolute;
          content: '';
          top: 0;
          right: 1px;
          left: 6px;
          bottom: 0;
          background: ${background};
          transform: skew(-1deg, 1deg);
          z-index: -1;
        }
      `,
      h2: css`
        margin: 45px 0 15px;
        line-height: 1.4em;
        font-weight: 500;
        font-size: 28px;
        letter-spacing: -0.02em;
      `,
    },
  },
};
