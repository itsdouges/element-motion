import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Swipe } from '../../../src';
import * as Common from 'yubaba-common';

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

storiesOf('yubaba/Swipe', module)
  .add('Up', () => makeStory('up'))
  .add('Down', () => makeStory('down'))
  .add('Left', () => makeStory('left'))
  .add('Right', () => makeStory('right'));
