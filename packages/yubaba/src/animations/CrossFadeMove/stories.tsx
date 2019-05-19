import { storiesOf } from '@storybook/react';
import Animator from '../../Animator';
import CrossFadeMove from './index';
import { createMoveExamples } from 'yubaba-common';

const Examples = createMoveExamples({ namePrefix: 'CrossFadeMove', useDistinctEnd: true })(
  Animator,
  CrossFadeMove
);

const stories = storiesOf('yubaba/CrossFadeMove', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
