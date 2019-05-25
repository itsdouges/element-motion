import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import Animator from '../../Animator';
import FadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'FadeMove', useDistinctEnd: true })(
  Animator,
  FadeMove
);

const stories = storiesOf('@element-motion/core/FadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
