import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Animator, { VisibilityManager, Noop } from '../../src';
import { Toggler } from 'yubaba-common';

const StyledBody = styled(BodyClassName)`
  background-color: #f2a2e8;
  margin: 0;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${props => props.color};
  font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  font-size: 24px;
  padding: 50px;
  height: calc(100vh - 100px);
  margin: 50px;
`;

const Button = styled.button`
  background-color: #baed91;
  padding: 10px;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: none;
`;

const TextContainer = styled.div`
  max-width: 500px;
  padding-bottom: 20px;
  text-align: center;
`;

storiesOf('yubaba/VisibilityManager', module)
  .add('NoManager', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <React.Fragment>
          <StyledBody className="" />
          {!shown ? (
            <Container color="#f8b88b">
              <Animator name="manager-example-1" key="1">
                <Noop duration={500}>
                  {({ ref, style }) => (
                    <Button style={style} ref={ref} onClick={() => toggle()}>
                      Click me and I'll render the next page and start the animation
                    </Button>
                  )}
                </Noop>
              </Animator>
            </Container>
          ) : (
            <Container color="#b2cefe">
              <TextContainer>
                This text was displayed immediately, which might not be what we want!
                <br />
                <br />
                Thanks to VisibilityManager we can hide elements until all animations have finished.
              </TextContainer>

              <Animator name="manager-example-1" key="2">
                {({ ref, style }) => (
                  <Button style={style} ref={ref} onClick={() => toggle()}>
                    This button was shown after the animation completed.
                    <br />
                    Click me and I'll render the previous page!
                  </Button>
                )}
              </Animator>
            </Container>
          )}
        </React.Fragment>
      )}
    </Toggler>
  ))
  .add('WithManager', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StyledBody className="" />
          {!shown ? (
            <Container color="#f8b88b">
              <Animator name="manager-example-2" key="1">
                <Noop duration={500}>
                  {({ ref, style }) => (
                    <Button style={style} ref={ref} onClick={() => toggle()}>
                      Click me and I'll render the next page and start the animation
                    </Button>
                  )}
                </Noop>
              </Animator>
            </Container>
          ) : (
            <VisibilityManager>
              {props => (
                <Container {...props} color="#b2cefe">
                  <TextContainer>
                    This text and container were hidden until the animation completed thanks to
                    VisibilityManager.
                  </TextContainer>

                  <Animator name="manager-example-2" key="2">
                    {({ ref, style }) => (
                      <Button style={style} ref={ref} onClick={() => toggle()}>
                        This button was shown after the animation completed.
                        <br />
                        Click me and I'll render the previous page!
                      </Button>
                    )}
                  </Animator>
                </Container>
              )}
            </VisibilityManager>
          )}
        </div>
      )}
    </Toggler>
  ));
