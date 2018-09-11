import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';
import BackIcon from '@material-ui/icons/ArrowBack';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';

import Toggler from '../Toggler';
import Baba, { CrossFadeMove } from '../../src/';

const Container = styled.div`
  position: relative;
  width: 400px;
  max-height: 600px;
  overflow: auto;
  border-radius: 3px;
  background-color: #ccc;
`;

const InnerContainer = styled.div`
  border-radius: 3px;
  height: 600px;
  padding-top: 20px;
`;

const FloatingSearchBar = styled.div`
  margin: 10px 30px;
  height: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  justify-content: center;
  background: white;
`;

const Input = styled.input`
  border: none;
  outline: none;
  line-height: 25px;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0 0 0 16px;
  font-size: 16px;
  word-wrap: break-word;
  outline: none;
  display: flex;
  flex: 1;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  color: inherit;
`;

const FixedSearchBar = styled.div`
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid #dfe1e5;
  height: 50px;
  position: fixed;
  margin-top: 8px;
  margin-left: 8px;
  top: 0;
  left: 0;
  width: 400px;
  background: white;
`;

storiesOf('Examples/FloatingSearchBar', module).add('cross fade move', () => (
  <Toggler>
    {({ shown, toggle }) => (
      <Container>
        <InnerContainer>
          {shown || (
            <Baba name="google-searchbar">
              <CrossFadeMove duration={150} timingFunction="">
                {({ ref, style }) => (
                  <FloatingSearchBar onClick={toggle} innerRef={ref} style={style}>
                    <IconButton color="default" aria-label="Menu" style={{ marginLeft: 'auto ' }}>
                      <MicIcon colorRendering="blue" />
                    </IconButton>
                  </FloatingSearchBar>
                )}
              </CrossFadeMove>
            </Baba>
          )}

          {shown && (
            <Baba name="google-searchbar">
              <CrossFadeMove duration={150} timingFunction="">
                {({ ref, style }) => (
                  <FixedSearchBar innerRef={ref} style={style}>
                    <IconButton color="default" aria-label="Menu" onClick={toggle}>
                      <BackIcon color="inherit" />
                    </IconButton>

                    <Input autoFocus placeholder="Search or type URL" />

                    <IconButton color="default" aria-label="Menu">
                      <MicIcon colorRendering="blue" />
                    </IconButton>
                  </FixedSearchBar>
                )}
              </CrossFadeMove>
            </Baba>
          )}
        </InnerContainer>
      </Container>
    )}
  </Toggler>
));
