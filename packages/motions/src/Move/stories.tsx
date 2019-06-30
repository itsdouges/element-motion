import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import { Motion } from '@element-motion/utils';
import Move from './index';

const Examples = createMoveExamples({
  namePrefix: 'Move',
  useDistinctEnd: false,
})(Motion as any, Move as any);

const stories = storiesOf('@element-motion/motions/Move', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
