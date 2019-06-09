import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import Motion from '../../../core/src/Motion';
import FadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'FadeMove', useDistinctEnd: true })(
  Motion,
  FadeMove as any
);

const stories = storiesOf('@element-motion/core/FadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
