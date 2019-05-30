import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Motion, { CircleShrink } from '../../../src';
import { Toggler } from '@element-motion/dev';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: #faf884;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

storiesOf('@element-motion/core/CircleShrink', module)
  .add('Default', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          {!shown ? (
            <Container background="#faf884" onClick={() => toggle()} style={{ cursor: 'pointer' }}>
              <Motion name="circle-shrink-square" key="1">
                <CircleShrink background="#faf884">
                  {({ ref, style }) => <div style={style} ref={ref} />}
                </CircleShrink>
              </Motion>
            </Container>
          ) : (
            <Container background="white">
              <Motion name="circle-shrink-square" key="2">
                {({ ref, style }) => <Root onClick={() => toggle()} style={style} ref={ref} />}
              </Motion>
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

          {!shown ? (
            <Container background="#faf884" onClick={() => toggle()} style={{ cursor: 'pointer' }}>
              <Padding />
              <Motion name="page-with-different-scroll-shrink" key="1">
                <CircleShrink background="#faf884">
                  {({ ref, style }) => <Root style={style} ref={ref} />}
                </CircleShrink>
              </Motion>
              <Padding />
            </Container>
          ) : (
            <Container>
              <Padding />
              <Padding />
              <Motion name="page-with-different-scroll-shrink" key="2">
                {({ ref, style }) => <Root onClick={() => toggle()} style={style} ref={ref} />}
              </Motion>
              <Padding />
              <Padding />
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ));
