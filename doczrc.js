const { css } = require('styled-components'); // eslint-disable-line

const backgroundColor = '#1D2330';
const primary = '#FFC400';
const lightText = 'rgba(255, 255, 255, 0.75)';

module.exports = {
  title: 'Element Motion',
  description: 'Declarative element motions for React.js 💨✨',
  typescript: true,
  dest: '/docs',
  codeSandbox: false,
  notUseSpecifiers: true,
  filterComponents: files => files.filter(filepath => /([^d]\.tsx?)$/.test(filepath)),
  menu: [
    'Introduction',
    'Getting started',
    'Advanced usage',
    'Create your own motions',
    'Troubleshooting',
    'Focal motions',
    'Supporting motions',
    'Composite experiences',
    'Utilities',
  ],
  themeConfig: {
    mode: 'dark',
    colors: {
      primary,
      sidebarBg: backgroundColor,
      sidebarText: lightText,
      sidebarPrimary: primary,
      sidebarBorder: 'transparent',
      link: primary,
    },
    styles: {
      body: css`
        background-color: ${backgroundColor};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: ${lightText} !important;

        input[class^='Search__Input-']::placeholder {
          color: ${lightText};
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
          color: ${lightText} !important;

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

        p,
        p[class^='Paragraph-'] {
          color: ${lightText};
        }
      `,
      h1: css`
        display: inline-block;
        margin: 60px 0 20px;
        font-size: 48px;
        font-weight: 600;
        letter-spacing: -0.06em;
        color: ${lightText};
      `,
      h2: css`
        margin: 45px 0 15px;
        line-height: 1.4em;
        font-weight: 500;
        font-size: 28px;
        letter-spacing: -0.02em;
        color: ${lightText};
      `,
    },
  },
};
