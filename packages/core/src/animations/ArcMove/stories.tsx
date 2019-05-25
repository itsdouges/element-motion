import { createMoveExamples } from '@element-motion/dev';
import { storiesOf } from '@storybook/react';
import Animator from '../../Animator';
import ArcMove from './index';

const Examples = createMoveExamples({
  namePrefix: 'ArcMove',
  useDistinctEnd: false,
})(Animator, ArcMove as any);

const stories = storiesOf('@element-motion/core/ArcMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
