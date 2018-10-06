import { storiesOf } from '@storybook/react';
import Baba from '../../Baba';
import Move from './index';
import { createMoveExamples } from 'yubaba-common';

const Examples = createMoveExamples({
  namePrefix: 'Move',
  useDistinctEnd: false,
})(Baba, Move);

const stories = storiesOf('yubaba/Move', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
