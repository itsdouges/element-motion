import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import { Motion } from '@element-motion/utils';
import CrossFadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'CrossFadeMove', useDistinctEnd: true })(
  Motion,
  CrossFadeMove as any
);

const stories = storiesOf('@element-motion/motions/CrossFadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
