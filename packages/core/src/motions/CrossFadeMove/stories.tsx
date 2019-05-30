import { storiesOf } from '@storybook/react';
import Motion from '../../Motion';
import CrossFadeMove from './index';
import { createMoveExamples } from '@element-motion/dev';

const Examples = createMoveExamples({ namePrefix: 'CrossFadeMove', useDistinctEnd: true })(
  Motion,
  CrossFadeMove
);

const stories = storiesOf('@element-motion/core/CrossFadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
