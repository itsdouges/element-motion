import * as React from 'react';
import styled from 'styled-components';

const PixelContainer = styled.div`
  height: 100vh;
  max-width: 411px;
  max-height: 731px;
  border-radius: 3px;
  box-shadow: 0 1px 50px rgba(32, 33, 36, 0.1);
  border: 1px solid rgba(32, 33, 36, 0.1);
  box-sizing: border-box;
  font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  user-select: none;
  position: relative;

  * {
    box-sizing: border-box;
    user-select: none;
  }

  ul {
    padding: 0;
    margin: 0;
  }
`;

const OverflowContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

const Toolbar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 26px;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  z-index: 9999999;
`;

const Square = styled.div`
  height: 12px;
  width: 12px;
  margin-left: auto;
  background-color: #000;
  margin-right: 9px;
  opacity: 0.35;
`;

const Circle = styled(Square)`
  margin-left: 0;
  border-radius: 50%;
`;

const Triangle = styled(Square)`
  margin-left: -3px;
  width: 0;
  height: 0;
  background-color: transparent;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 12px solid #000;
`;

interface SmallViewportProps {
  children: React.ReactNode;
}

export default class SmallViewport extends React.Component<SmallViewportProps> {
  render() {
    return (
      <PixelContainer id="small-viewport">
        <Toolbar>
          <Square />
          <Circle />
          <Triangle />
        </Toolbar>

        <OverflowContainer>{this.props.children}</OverflowContainer>
      </PixelContainer>
    );
  }
}
