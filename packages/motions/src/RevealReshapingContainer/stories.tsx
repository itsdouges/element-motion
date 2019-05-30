/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Toggler } from '@element-motion/dev';
import RevealReshapingContainer from './index';

const FixedContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 20%;
  padding: 16px;
`;

const Container = styled.div`
  /* Watch out for collapsing margins. This will fuck your shit up for motions. */
  display: flex;
`;

storiesOf('@element-motion/core/RevealReshapingContainer', module)
  .add('HeightOnly', () => (
    <FixedContainer>
      <Toggler>
        {toggler => (
          <RevealReshapingContainer
            triggerKey={`${toggler.shown}`}
            boxShadow="0 1px 50px rgba(32, 33, 36, 0.1)"
            padding="16px"
            maxWidth="500px"
            margin="0 auto"
            background="rgba(32, 33, 36, 0.2)"
          >
            {props => (
              <Container style={props.style} className={props.className} ref={props.ref}>
                <div>
                  {toggler.shown ? (
                    <>
                      <h1>Details</h1>
                      <p>Many details are revealed here.</p>
                      <button type="button" onClick={() => toggler.toggle()}>
                        Hide contents
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => toggler.toggle()}>
                      View contents
                    </button>
                  )}
                </div>
              </Container>
            )}
          </RevealReshapingContainer>
        )}
      </Toggler>
    </FixedContainer>
  ))
  .add('HeightAndWidth', () => (
    <FixedContainer>
      <Toggler>
        {toggler => (
          <RevealReshapingContainer
            id="dialog-width"
            triggerKey={`${toggler.shown}`}
            boxShadow="0 1px 50px rgba(32, 33, 36, 0.1)"
            padding="16px"
            maxWidth="500px"
            margin="0 auto"
            display="inline-block"
          >
            {props => (
              <Container style={props.style} className={props.className} ref={props.ref}>
                <div>
                  {toggler.shown ? (
                    <>
                      <h1>Details</h1>
                      <p>
                        Many details are revealed here long long long long long long long long long
                        long long long Many details are revealed here long long long long long long
                        long long long long long long
                      </p>
                      <button type="button" onClick={() => toggler.toggle()}>
                        Hide contents
                      </button>
                    </>
                  ) : (
                    <>
                      <h1>Details</h1>
                      <p>View more.</p>
                      <button type="button" onClick={() => toggler.toggle()}>
                        Hide contents
                      </button>
                    </>
                  )}
                </div>
              </Container>
            )}
          </RevealReshapingContainer>
        )}
      </Toggler>
    </FixedContainer>
  ));
