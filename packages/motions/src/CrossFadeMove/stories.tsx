import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import Motion from '../../../core/src/Motion';
import CrossFadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'CrossFadeMove', useDistinctEnd: true })(
  Motion,
  CrossFadeMove as any
);

const stories = storiesOf('@element-motion/core/CrossFadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
