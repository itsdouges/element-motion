import { storiesOf } from '@storybook/react';
import Animator from '../../Animator';
import Move from './index';
import { createMoveExamples } from 'yubaba-common';

const Examples = createMoveExamples({
  namePrefix: 'Move',
  useDistinctEnd: false,
})(Animator, Move);

const stories = storiesOf('yubaba/Move', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
