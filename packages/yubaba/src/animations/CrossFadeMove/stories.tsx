import { storiesOf } from '@storybook/react';
import Baba from '../../Baba';
import CrossFadeMove from './index';
import { createMoveExamples } from 'yubaba-common';

const Examples = createMoveExamples({ namePrefix: 'CrossFadeMove', useDistinctEnd: true })(
  Baba,
  CrossFadeMove
);

const stories = storiesOf('yubaba/CrossFadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
