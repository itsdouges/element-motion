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
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const BlueRoot = Root.extend`
  background: blue;
`;

storiesOf('CircleExpand', module).add('from square', () => (
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
));
