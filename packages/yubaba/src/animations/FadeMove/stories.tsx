import { storiesOf } from '@storybook/react';
import { createMoveExamples } from 'yubaba-common';
import Animator from '../../Animator';
import FadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'FadeMove', useDistinctEnd: true })(
  Animator,
  FadeMove
);

const stories = storiesOf('yubaba/FadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
