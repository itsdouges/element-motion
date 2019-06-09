import { storiesOf } from '@storybook/react';
import { createMoveExamples } from '@element-motion/dev';
import Motion from '../../../core/src/Motion';
import Move from './index';

const Examples = createMoveExamples({
  namePrefix: 'Move',
  useDistinctEnd: false,
})(Motion, Move as any);

const stories = storiesOf('@element-motion/core/Move', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
