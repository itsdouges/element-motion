import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba from '../../Baba';
import Move from './index';
import * as Common from 'yubaba-common';

const Examples = Common.createMoveExamples({
  namePrefix: 'Move',
  useDistinctEnd: false,
})(Baba, Move);

const stories = storiesOf('yubaba/Move', module);
Object.keys(Examples).forEach(key => stories.add(key, Examples[key]));
stories.add('Arc', () => (
  <Common.Toggler>
    {({ shown, toggle }) => (
      <div>
        {!shown ? (
          <Baba name="Move-anim" key="arc-move-1">
            <Move variant="arc-left">
              {({ ref, ...props }) => (
                <Common.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
              )}
            </Move>
          </Baba>
        ) : (
          <Baba name="Move-anim" key="arc-move-2">
            <Move variant="arc-left">
              {({ ref, ...props }) => (
                <Common.FixedListItem innerRef={ref} onClick={() => toggle()} {...props} />
              )}
            </Move>
          </Baba>
        )}
      </div>
    )}
  </Common.Toggler>
));
