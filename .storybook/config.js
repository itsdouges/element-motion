import { configure } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'yubaba',
  url: 'https://github.com/madou/yubaba',
  showStoriesPanel: true,
  showAddonPanel: true,
  addonPanelInRight: true,
});

const req = require.context('../packages', true, /.*stories\.tsx$/);

setAddon(JSXAddon);
configure(() => req.keys().forEach(req), module);
