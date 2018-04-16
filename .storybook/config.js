import { configure } from '@storybook/react';

const req = require.context('../packages', true, /.*stories\.tsx$/);

configure(() => req.keys().forEach(req), module);
