import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Swipe } from '../../src';
import Toggler from '../Toggler';
import StickyButton from '../StickyButton';

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
  <Toggler>
    {({ shown, toggle }) => (
      <div>
        <StickyButton onClick={toggle}>toggle</StickyButton>
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
  </Toggler>
);

storiesOf('Animations/Swipe', module)
  .add('up', () => makeStory('up'))
  .add('down', () => makeStory('down'))
  .add('left', () => makeStory('left'))
  .add('right', () => makeStory('right'));
