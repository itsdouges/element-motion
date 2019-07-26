import * as React from 'react';
import styled, { css } from 'styled-components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const PixelContainer = styled.div<{ display: string }>`
  height: 100vh;
  max-width: 411px;
  max-height: 731px;
  border-radius: 8px;
  box-shadow: 0 1px 50px rgba(32, 33, 36, 0.1);
  border: 1px solid rgba(32, 33, 36, 0.1);
  box-sizing: border-box;
  font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  user-select: none;
  position: relative;
  overflow: hidden;
  display: ${props => props.display};
  flex-direction: column;
  background-color: white;
  color: #1d2330;

  * {
    box-sizing: border-box;
    user-select: none;
  }

  button::-moz-focus-inner {
    border: 0;
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
`;

const ToolbarContainer = styled.div`
  z-index: 90;
`;

interface SquareProps {
  invertColor: boolean;
}

const Square = styled.div<SquareProps>`
  height: 12px;
  width: 12px;
  margin-left: auto;
  background-color: ${props => (props.invertColor ? '#fff' : '#000')};
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
  border-top: 12px solid ${props => (props.invertColor ? '#fff' : '#000')};
`;

const RelativeContainer = styled.div<{ appBarOffset: boolean }>`
  position: relative;

  ${props =>
    props.appBarOffset
      ? css`
          /* Hack to align contents to container taking off header height */
          height: calc(100% - 82px);

          @media (min-width: 584px) {
            /* Hack to align contents to container taking off header height */
            height: calc(100% - 90px);
          }
        `
      : ''};
`;

interface SmallViewportProps {
  children: React.ReactNode;
  invertColor?: boolean;
  appBar?: React.ReactNode;
  display: string;
}

export default class SmallViewport extends React.Component<SmallViewportProps> {
  static defaultProps = {
    display: 'flex',
  };

  theme = createMuiTheme({
    palette: {
      primary: {
        light: '#484848',
        main: '#212121',
        dark: '#000000',
        contrastText: '#fff',
      },
    },
  });

  render() {
    const { invertColor, children, appBar, display } = this.props;
    return (
      <MuiThemeProvider theme={this.theme}>
        <PixelContainer display={display}>
          <ToolbarContainer>
            <Toolbar>
              <Square invertColor={!!invertColor} />
              <Circle invertColor={!!invertColor} />
              <Triangle invertColor={!!invertColor} />
            </Toolbar>

            {appBar}
          </ToolbarContainer>

          <RelativeContainer appBarOffset={!!appBar}>
            <OverflowContainer>{children}</OverflowContainer>
          </RelativeContainer>
        </PixelContainer>
      </MuiThemeProvider>
    );
  }
}
