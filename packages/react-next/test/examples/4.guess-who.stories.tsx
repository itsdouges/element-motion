import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { Move, BabaManager, CircleShrink, CircleExpand, Wait } from '../../src';
import Toggler from '../Toggler';
import StickyButton from '../StickyButton';

const Root = styled.img`
  width: 120px;
  height: 160px;
  box-sizing: border-box;
`;

const BigRoot = styled.img`
  width: 360px;
  height: 480px;
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

storiesOf('Examples/GuessWho', module)
  .add('move expand', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {!shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="#db6f59" {...props}>
                  <Baba name="managed-move-and-expand" key="1">
                    <CircleExpand background="#fcce2e">
                      <Move>
                        {({ ref, style }) => (
                          <Root
                            src={require('./images/guess-who.png')}
                            style={style}
                            innerRef={ref}
                          />
                        )}
                      </Move>
                    </CircleExpand>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          ) : (
            <BabaManager key="b">
              {props => (
                <Container background="#37a7e0" {...props}>
                  <Baba name="managed-move-and-expand" key="2">
                    {({ ref, style }) => (
                      <BigRoot src={require('./images/female2.png')} style={style} innerRef={ref} />
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
  .add('move shrink', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {!shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="#37a7e0" {...props}>
                  <Baba name="managed-move-then-shrink" key="1">
                    <Move>
                      <Wait>
                        <CircleShrink background="#fcce2e">
                          {({ ref, style }) => (
                            <BigRoot
                              src={require('./images/guess-who.png')}
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
            <Container background="#db6f59">
              <Baba name="managed-move-then-shrink" key="2">
                {({ ref, style }) => (
                  <Root src={require('./images/female.png')} style={style} innerRef={ref} />
                )}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('move expand shrink', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="#37a7e0" {...props}>
                  <Baba name="managed-altogether" key="1">
                    <Move>
                      <Wait>
                        <CircleShrink background="#37a7e0">
                          {({ ref, style }) => (
                            <BigRoot
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
                    <Move delay={100}>
                      <CircleExpand background="#fcce2e">
                        {({ ref, style }) => (
                          <Root
                            src={require('./images/guess-who.png')}
                            style={style}
                            innerRef={ref}
                          />
                        )}
                      </CircleExpand>
                    </Move>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </div>
      )}
    </Toggler>
  ));
