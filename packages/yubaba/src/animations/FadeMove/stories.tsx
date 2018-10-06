import { storiesOf } from '@storybook/react';
import { createMoveExamples } from 'yubaba-common';
import Baba from '../../Baba';
import FadeMove from './index';

const Examples = createMoveExamples({ namePrefix: 'FadeMove', useDistinctEnd: true })(
  Baba,
  FadeMove
);

const stories = storiesOf('yubaba/FadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
