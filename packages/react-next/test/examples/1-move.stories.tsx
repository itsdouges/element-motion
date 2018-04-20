import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Move } from '../../src';
import Toggler from '../Toggler';
import StickyButton from '../StickyButton';

interface RootProps {
  margin?: boolean;
}

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props: RootProps) => (props.margin ? 30 : 0)}px;
`;

const RightRoot = Root.extend`
  background-color: red;
  float: right;
`;

const BigRightRoot = RightRoot.extend`
  width: 400px;
  height: 400px;
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

storiesOf('Move', module)
  .add('square to square', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-square" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-square" key="2">
              <Move>{({ ref, style }) => <RightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('square to square with margin', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-square-margin" key="1">
              <Move>{({ ref, style }) => <Root margin style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-square-margin" key="2">
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
            <Baba name="square-to-big-square" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-big-square" key="2">
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
            <Baba name="square-to-circle" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-circle" key="2">
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
            <>
              <Padding data-yolo />
              <Baba name="offscreen-big-square-to-small-square" key="2">
                <Move>{({ ref, style }) => <BigRightRoot style={style} innerRef={ref} />}</Move>
              </Baba>
            </>
          ) : (
            <Baba name="offscreen-big-square-to-small-square" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </LongContainer>
      )}
    </Toggler>
  ))
  .add('square to offscreen big square with margin', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-offscreen-big-square-with-margin" key="1">
              <Move>{({ ref, style }) => <Root margin style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <>
              <Padding data-yolo />
              <Baba name="square-to-offscreen-big-square-with-margin" key="2">
                <Move>
                  {({ ref, style }) => <BigRightRoot margin style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </>
          )}
        </>
      )}
    </Toggler>
  ));
