import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { Move, BabaManager, CircleShrink, CircleExpand, Wait } from '../../src';
import Toggler from '../common/Toggler';

const Person = styled.img`
  width: 120px;
  height: 160px;
  box-sizing: border-box;
  cursor: pointer;
`;

const BigPerson = styled.img`
  width: 360px;
  height: 480px;
  cursor: pointer;
`;

interface BackgroundProps {
  background: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: BackgroundProps) => props.background};
  height: 100vh;
`;

const NoMarginBody = styled(BodyClassName)`
  margin: 0;
  background-color: #db6f59;
`;

storiesOf('Example/GuessWho', module)
  .add('WithCrossFadeMove', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          {!shown ? (
            <Container background="#db6f59">
              <Baba name="guess-move" key="1">
                <Move>
                  {({ ref, style }) => (
                    <Person
                      onClick={toggle}
                      src={require('./images/guess-who.png')}
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </Container>
          ) : (
            <Container background="#37a7e0">
              <Baba name="guess-move" key="2">
                {({ ref, style }) => (
                  <BigPerson
                    onClick={toggle}
                    src={require('./images/female2.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('WithCircleExpand', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          {!shown ? (
            <Container background="#db6f59">
              <Baba name="guess-expand-and-move" key="1">
                <CircleExpand background="#fcce2e">
                  <Move>
                    {({ ref, style }) => (
                      <Person
                        onClick={toggle}
                        src={require('./images/guess-who.png')}
                        style={style}
                        innerRef={ref}
                      />
                    )}
                  </Move>
                </CircleExpand>
              </Baba>
            </Container>
          ) : (
            <Container background="#37a7e0">
              <Baba name="guess-expand-and-move" key="2">
                {({ ref, style }) => (
                  <BigPerson
                    onClick={toggle}
                    src={require('./images/female2.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('WithWait', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          {!shown ? (
            <Container background="#db6f59">
              <Baba name="guess-expand-then-move" key="1">
                <CircleExpand background="#fcce2e">
                  <Wait>
                    <Move>
                      {({ ref, style }) => (
                        <Person
                          onClick={toggle}
                          src={require('./images/guess-who.png')}
                          style={style}
                          innerRef={ref}
                        />
                      )}
                    </Move>
                  </Wait>
                </CircleExpand>
              </Baba>
            </Container>
          ) : (
            <Container background="#37a7e0">
              <Baba name="guess-expand-then-move" key="2">
                {({ ref, style }) => (
                  <BigPerson
                    onClick={toggle}
                    src={require('./images/female2.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('WithBabaManager', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          {!shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="#db6f59" {...props}>
                  <Baba name="managed-guess-move-expand" key="1">
                    <CircleExpand background="#fcce2e">
                      <Wait>
                        <Move>
                          {({ ref, style }) => (
                            <Person
                              onClick={toggle}
                              src={require('./images/guess-who.png')}
                              style={style}
                              innerRef={ref}
                            />
                          )}
                        </Move>
                      </Wait>
                    </CircleExpand>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          ) : (
            <BabaManager key="b">
              {props => (
                <Container background="#37a7e0" {...props}>
                  <Baba name="managed-guess-move-expand" key="2">
                    {({ ref, style }) => (
                      <BigPerson
                        onClick={toggle}
                        src={require('./images/female2.png')}
                        style={style}
                        innerRef={ref}
                      />
                    )}
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('WithCircleShrink', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />

          {shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="#37a7e0" {...props}>
                  <Baba name="managed-altogether" key="1">
                    <Move>
                      <Wait>
                        <CircleShrink background="#37a7e0">
                          {({ ref, style }) => (
                            <BigPerson
                              onClick={toggle}
                              src={require('./images/female2.png')}
                              style={style}
                              innerRef={ref}
                            />
                          )}
                        </CircleShrink>
                      </Wait>
                    </Move>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          ) : (
            <BabaManager key="b">
              {props => (
                <Container background="#db6f59" {...props}>
                  <Baba name="managed-altogether" key="2">
                    <CircleExpand background="#fcce2e">
                      <Wait>
                        <Move>
                          {({ ref, style }) => (
                            <Person
                              onClick={toggle}
                              src={require('./images/guess-who.png')}
                              style={style}
                              innerRef={ref}
                            />
                          )}
                        </Move>
                      </Wait>
                    </CircleExpand>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </div>
      )}
    </Toggler>
  ));
