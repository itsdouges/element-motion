import { storiesOf } from '@storybook/react';
import Baba from '../../Baba';
import FLIPMove from '../FLIPMove';
import { createMoveExamples } from 'yubaba-common';

const Examples = createMoveExamples({
  namePrefix: 'FLIPMove',
  useDistinctEnd: false,
})(Baba, FLIPMove);

const stories = storiesOf('yubaba/FLIPMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
