import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Move } from '../../src';
import Toggler from '../Toggler';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightRoot = Root.extend`
  background-color: red;
  float: right;
`;

const BigRightRoot = RightRoot.extend`
  width: 400px;
  height: 400px;
`;

const StickyButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 20px;
  border-radius: 4px;
  background-color: #ccc;
  border: 2px solid grey;
  padding: 8px;
`;

const LongContainer = styled.div`
  height: 2000px;
`;

const Padding = styled.div`
  height: 90vh;
`;

const Circle = RightRoot.extend`
  border-radius: 50%;
  background-color: blue;
`;

storiesOf('move', module)
  .add('square to square', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="basic-move" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="basic-move" key="2">
              <Move>{({ ref, style }) => <RightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('square to big square', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="basic-move-2" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="basic-move-2" key="2">
              <Move>{({ ref, style }) => <BigRightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('square to circle', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="basic-move-3" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="basic-move-3" key="2">
              <Move>{({ ref, style }) => <Circle style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('offscreen big square to small square', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <LongContainer>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="basic-move-1" key="2">
              <Move>
                {({ ref, style }) => (
                  <>
                    <Padding />
                    <BigRightRoot style={style} innerRef={ref} />
                  </>
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="basic-move-1" key="1">
              <Move>
                {({ ref, style }) => (
                  <>
                    <Root style={style} innerRef={ref} />
                    <Padding />
                  </>
                )}
              </Move>
            </Baba>
          )}
        </LongContainer>
      )}
    </Toggler>
  ));
