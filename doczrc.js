const { css } = require('styled-components'); // eslint-disable-line

const primary = 'rgba(157, 0, 255, 0.8)';
const darkText = 'rgba(41, 52, 98, 0.85)';
const lightText = 'rgba(255, 255, 255, 0.9)';

module.exports = {
  title: 'element motion',
  description: 'element motion for React.js 💨✨',
  typescript: true,
  dest: '/docs',
  codeSandbox: false,
  notUseSpecifiers: true,
  filterComponents: files => files.filter(filepath => /([^d]\.tsx?)$/.test(filepath)),
  themeConfig: {
    colors: {
      primary,
      sidebarBg: '#fff',
      sidebarText: darkText,
      sidebarPrimary: primary,
      sidebarBorder: 'transparent',
      link: primary,
    },
    styles: {
      body: css`
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: ${darkText} !important;

        input[class^='Search__Input-']::placeholder {
          color: rgba(41, 52, 98, 0.64);
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
          color: ${darkText} !important;

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

        [class^='Logo__LogoText-'] {
          font-size: 2em;
        }

        p {
          color: ${darkText};
        }
      `,
      h1: css`
        display: inline-block;
        margin: 60px 0 20px;
        font-size: 48px;
        font-weight: 600;
        letter-spacing: -0.06em;
        color: ${lightText};
        position: relative;
        z-index: 1;

        :after {
          position: absolute;
          content: '';
          top: 0;
          right: 1px;
          left: 6px;
          bottom: 0;
          background: ${primary};
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
        color: ${darkText};
      `,
    },
  },
};
