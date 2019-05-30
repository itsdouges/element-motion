import { storiesOf } from '@storybook/react';
import Motion from '../../Motion';
import Move from './index';
import { createMoveExamples } from '@element-motion/dev';

const Examples = createMoveExamples({
  namePrefix: 'Move',
  useDistinctEnd: false,
})(Motion, Move);

const stories = storiesOf('@element-motion/core/Move', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
