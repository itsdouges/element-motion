import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { CircleExpand } from '../../src';
import Toggler from '../Toggler';
import StickyButton from '../StickyButton';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Padding = styled.div`
  height: 500px;
  width: 50px;
  flex-shrink: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const BlueRoot = Root.extend`
  background: blue;
`;

storiesOf('CircleExpand', module)
  .add('from square', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Container>
              <Baba name="circle-expand-square" key="1">
                <CircleExpand background="green">
                  {({ ref, style }) => <Root style={style} innerRef={ref} />}
                </CircleExpand>
              </Baba>
            </Container>
          ) : (
            <Container>
              <Baba name="circle-expand-square" key="2">
                {({ ref, style }) => <BlueRoot style={style} innerRef={ref} />}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('to page with different scroll', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            // Note the key. Without it things remove from DOM before we expect.
            <Container key="11">
              <Padding />

              <Baba name="page-with-different-scroll" key="1">
                <CircleExpand background="green">
                  {({ ref, style }) => <Root style={style} innerRef={ref} />}
                </CircleExpand>
              </Baba>

              <Padding />
            </Container>
          ) : (
            // Note the key. Without it things remove from DOM before we expect.
            <Container key="22">
              <Baba name="page-with-different-scroll" key="2">
                {({ ref, style }) => <BlueRoot style={style} innerRef={ref} />}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ));
