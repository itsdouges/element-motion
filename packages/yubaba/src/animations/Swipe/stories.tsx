import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Swipe } from '../../../src';
<<<<<<< HEAD:packages/yubaba/src/animations/Swipe/stories.tsx
import Toggler from '../../../examples/common/Toggler';
import StickyButton from '../../../examples/common/StickyButton';
=======
import * as Common from 'yubaba-common';
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/Swipe/stories.tsx

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: #db6f59;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const makeStory = (direction: string) => (
  <Common.Toggler>
    {({ shown, toggle }) => (
      <div>
        <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
        {!shown ? (
          <Container>
            <Baba name={`swipe-${direction}`} key="1">
              <Swipe background="#db6f59" direction={direction as any}>
                {({ ref, style }) => <Root style={style} innerRef={ref} />}
              </Swipe>
            </Baba>
          </Container>
        ) : (
          <Container>
            <Baba name={`swipe-${direction}`} key="2">
              {({ ref, style }) => <div style={style} ref={ref} />}
            </Baba>
          </Container>
        )}
      </div>
    )}
  </Common.Toggler>
);

<<<<<<< HEAD:packages/yubaba/src/animations/Swipe/stories.tsx
storiesOf('Swipe', module)
=======
storiesOf('yubaba/Swipe', module)
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/Swipe/stories.tsx
  .add('Up', () => makeStory('up'))
  .add('Down', () => makeStory('down'))
  .add('Left', () => makeStory('left'))
  .add('Right', () => makeStory('right'));
