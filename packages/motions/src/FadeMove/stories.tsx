import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import { Motion } from '@element-motion/utils';
import FadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'FadeMove', useDistinctEnd: true })(
  Motion,
  FadeMove as any
);

const stories = storiesOf('@element-motion/motions/FadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
