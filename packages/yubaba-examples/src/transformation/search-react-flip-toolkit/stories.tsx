import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Toggler } from 'yubaba-common';
import * as Styled from './styled';

storiesOf('yubaba-examples/Transformation/Search/react-flip-toolkit', module).add('Default', () => (
  <Styled.Banner>
    <Styled.Container>
      <Styled.Header>Find help and support</Styled.Header>
      <Toggler>
        {({ shown, toggle }) => (
          <Flipper flipKey={shown}>
            {shown && (
              <React.Fragment>
                <Styled.Blanket onClick={() => toggle()} />

                <Styled.StickyContainer>
                  <Styled.Container>
                    <Flipped flipId="input">
                      <Styled.StickyInput autoFocus placeholder="Search for anything..." />
                    </Flipped>
                  </Styled.Container>

                  <Flipped flipId="background">
                    <Styled.InputBackground />
                  </Flipped>
                </Styled.StickyContainer>
              </React.Fragment>
            )}

            <Styled.RelativeContainer>
              {!shown ? (
                <Flipped flipId="input">
                  <Styled.Input onClick={() => toggle()} placeholder="Search for anything..." />
                </Flipped>
              ) : (
                // We want to not remove this so we still have it taking up space. Looks like there isn't
                // an easy way to keep this element around with react-flip-toolkit.
                <Styled.Input
                  onClick={() => toggle()}
                  placeholder="Search for anything..."
                  style={{ opacity: 0 }}
                />
              )}

              {shown || (
                <Flipped flipId="background">
                  <Styled.InputStaticBackground />
                </Flipped>
              )}
            </Styled.RelativeContainer>
          </Flipper>
        )}
      </Toggler>
    </Styled.Container>
  </Styled.Banner>
));
