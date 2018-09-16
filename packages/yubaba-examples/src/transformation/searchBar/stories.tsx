import { storiesOf } from '@storybook/react';
import * as React from 'react';
import BackIcon from '@material-ui/icons/ArrowBack';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import Baba, { CrossFadeMove } from 'yubaba';

import * as Common from 'yubaba-common';
import * as Styled from './styled';

storiesOf('yubaba-examples/Transformation/SearchBar', module).add('Default', () => (
  <Common.Toggler>
    {({ shown, toggle }) => (
      <Common.SmallViewport>
        {shown || (
          <Baba name="google-searchbar">
            <CrossFadeMove duration={400}>
              {({ ref, style }) => (
                <Styled.FloatingSearchBar onClick={() => toggle()} innerRef={ref} style={style}>
                  <IconButton color="default" aria-label="Menu" style={{ marginLeft: 'auto ' }}>
                    <MicIcon colorRendering="blue" />
                  </IconButton>
                </Styled.FloatingSearchBar>
              )}
            </CrossFadeMove>
          </Baba>
        )}

        {shown && (
          <Baba name="google-searchbar">
            <CrossFadeMove duration={300}>
              {({ ref, style }) => (
                <Styled.FixedSearchBar innerRef={ref} style={style}>
                  <IconButton color="default" aria-label="Menu" onClick={() => toggle()}>
                    <BackIcon color="inherit" />
                  </IconButton>

                  <Styled.Input autoFocus placeholder="Search or type URL" />

                  <IconButton color="default" aria-label="Menu">
                    <MicIcon colorRendering="blue" />
                  </IconButton>
                </Styled.FixedSearchBar>
              )}
            </CrossFadeMove>
          </Baba>
        )}
      </Common.SmallViewport>
    )}
  </Common.Toggler>
));
