import { storiesOf } from '@storybook/react';
import Animator from '../../Animator';
import CrossFadeMove from './index';
import { createMoveExamples } from '@element-motion/dev';

const Examples = createMoveExamples({ namePrefix: 'CrossFadeMove', useDistinctEnd: true })(
  Animator,
  CrossFadeMove
);

const stories = storiesOf('@element-motion/core/CrossFadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
