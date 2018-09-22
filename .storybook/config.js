import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'yubaba (back to github)',
  url: 'https://github.com/madou/yubaba',
  showStoriesPanel: true,
  showAddonPanel: true,
  addonPanelInRight: true,
});

const req = require.context('../packages', true, /.*stories\.tsx$/);

configure(() => req.keys().forEach(req), module);
