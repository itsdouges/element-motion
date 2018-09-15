import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { CircleShrink } from '../../../src';
import Toggler from '../../../examples/common/Toggler';
import StickyButton from '../../../examples/common/StickyButton';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: #fcce2e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface BackgroundProps {
  background?: string;
}

const Container = styled.div`
  display: flex;
  background: ${(props: BackgroundProps) => props.background || ''};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const NoMarginBody = styled(BodyClassName)`
  margin: 0;
`;

const Padding = styled.div`
  height: 500px;
  flex-shrink: 0;
`;

storiesOf('CircleShrink', module)
  .add('Default', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Container background="#fcce2e">
              <Baba name="circle-shrink-square" key="1">
                <CircleShrink background="#fcce2e">
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
  ))
  .add('ToLongPage', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Container background="#fcce2e">
              <Padding />
              <Baba name="page-with-different-scroll-shrink" key="1">
                <CircleShrink background="#fcce2e">
                  {({ ref, style }) => <Root style={style} innerRef={ref} />}
                </CircleShrink>
              </Baba>
              <Padding />
            </Container>
          ) : (
            <Container>
              <Padding />
              <Padding />
              <Baba name="page-with-different-scroll-shrink" key="2">
                {({ ref, style }) => <Root style={style} innerRef={ref} />}
              </Baba>
              <Padding />
              <Padding />
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ));
