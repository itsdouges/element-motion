import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Swipe } from '../../../src';
import * as Common from 'yubaba-common';

const Root = styled.button`
  width: 100px;
  height: 100px;
  background: #f8b88b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
`;

const Container = styled.div<{ interactive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  cursor: ${props => (props.interactive ? 'pointer' : 'default')};
`;

const makeStory = (direction: string) => (
  <Common.Toggler>
    {({ shown, toggle }) => (
      <div>
        {!shown ? (
          <Container>
            <Baba name={`swipe-${direction}`} key="1">
              <Swipe background="#f8b88b" direction={direction as any}>
                {({ ref, style }) => <Root onClick={() => toggle()} style={style} ref={ref} />}
              </Swipe>
            </Baba>
          </Container>
        ) : (
          <Container onClick={() => toggle()} interactive>
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
