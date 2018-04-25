import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { CircleShrink } from '../../src';
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

interface BackgroundProps {
  background: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: BackgroundProps) => props.background};
  height: 100vh;
`;

const NoMarginBody = styled(BodyClassName)`
  margin: 0;
`;

storiesOf('CircleShrink', module).add('to square', () => (
  <Toggler>
    {({ shown, toggle }) => (
      <div>
        <NoMarginBody className="" />

        <StickyButton onClick={toggle}>toggle</StickyButton>
        {!shown ? (
          <Container background="green">
            <Baba name="circle-shrink-square" key="1">
              <CircleShrink background="green">
                {({ ref, style }) => <div style={style} ref={ref} />}
              </CircleShrink>
            </Baba>
          </Container>
        ) : (
          <Container background="white">
            <Baba name="circle-shrink-square" key="2">
              {({ ref, style }) => <Root style={style} innerRef={ref} />}
            </Baba>
          </Container>
        )}
      </div>
    )}
  </Toggler>
));
