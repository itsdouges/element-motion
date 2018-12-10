import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Move as Move } from 'yubaba';
import { Toggler } from 'yubaba-common';
import * as Styled from './styled';

const DURATION = 400;

storiesOf('yubaba-examples/Transformation/Search', module).add('Default', () => (
  <Styled.Banner>
    <Styled.Container>
      <Styled.Header>Find help and support</Styled.Header>
      <Toggler>
        {({ shown, toggle }) => (
          <React.Fragment>
            {shown && (
              <React.Fragment>
                <Styled.Blanket onClick={() => toggle()} />

                <Styled.StickyContainer>
                  <Styled.Container>
                    <Baba name="search-bar">
                      <Move zIndex={802} duration={DURATION}>
                        {baba => (
                          <Styled.StickyInput
                            autoFocus
                            style={baba.style}
                            innerRef={baba.ref}
                            placeholder="Search for anything..."
                          />
                        )}
                      </Move>
                    </Baba>
                  </Styled.Container>

                  <Baba name="search-bar-bg">
                    <Move zIndex={801} duration={DURATION}>
                      {baba => <Styled.InputBackground style={baba.style} innerRef={baba.ref} />}
                    </Move>
                  </Baba>
                </Styled.StickyContainer>
              </React.Fragment>
            )}

            <Styled.RelativeContainer>
              <Baba name="search-bar" in={!shown}>
                <Move zIndex={802} duration={DURATION}>
                  {baba => (
                    <Styled.Input
                      onClick={() => toggle()}
                      style={{
                        ...baba.style,
                        opacity: shown ? 0 : 1,
                      }}
                      innerRef={baba.ref}
                      placeholder="Search for anything..."
                    />
                  )}
                </Move>
              </Baba>

              <Baba name="search-bar-bg" in={!shown}>
                <Move zIndex={801} duration={DURATION}>
                  {baba => (
                    <Styled.InputStaticBackground
                      style={{
                        ...baba.style,
                        opacity: shown ? 0 : 1,
                      }}
                      innerRef={baba.ref}
                    />
                  )}
                </Move>
              </Baba>
            </Styled.RelativeContainer>
          </React.Fragment>
        )}
      </Toggler>
    </Styled.Container>
  </Styled.Banner>
));
