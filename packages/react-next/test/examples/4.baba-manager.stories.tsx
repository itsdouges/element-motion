import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { Move, BabaManager, CircleShrink, CircleExpand, Wait } from '../../src';
import Toggler from '../Toggler';
import StickyButton from '../StickyButton';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: blue;
`;

const BigRoot = styled.div`
  width: 400px;
  height: 300px;
  background: blue;
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
`;

storiesOf('BabaManager', module)
  .add('unmanaged move and expand', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {!shown ? (
            <Container background="white">
              <Baba name="unmanaged-move-and-expand" key="1">
                <CircleExpand background="green">
                  <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
                </CircleExpand>
              </Baba>
            </Container>
          ) : (
            <Container background="white">
              <Baba name="unmanaged-move-and-expand" key="2">
                {({ ref, style }) => <BigRoot style={style} innerRef={ref} />}
              </Baba>
            </Container>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('managed move and expand', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {!shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="white" {...props}>
                  <Baba name="managed-move-and-expand" key="1">
                    <CircleExpand background="green">
                      <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
                    </CircleExpand>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          ) : (
            <BabaManager key="b">
              {props => (
                <Container background="green" {...props}>
                  <Baba name="managed-move-and-expand" key="2">
                    {({ ref, style }) => <BigRoot style={style} innerRef={ref} />}
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('unmanaged move then shrink', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {!shown ? (
            <Container background="green">
              <Baba name="unmanaged-move-then-shrink" key="1">
                <Move>
                  <Wait>
                    <CircleShrink background="green">
                      {({ ref, style }) => <BigRoot style={style} innerRef={ref} />}
                    </CircleShrink>
                  </Wait>
                </Move>
              </Baba>
            </Container>
          ) : (
            <Container background="white">
              <Baba name="unmanaged-move-then-shrink" key="2">
                {({ ref, style }) => <Root style={style} innerRef={ref} />}
              </Baba>
            </Container>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('managed move then shrink', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {!shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="green" {...props}>
                  <Baba name="managed-move-then-shrink" key="1">
                    <Move>
                      <Wait>
                        <CircleShrink background="green">
                          {({ ref, style }) => <BigRoot style={style} innerRef={ref} />}
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
                <Container background="white" {...props}>
                  <Baba name="managed-move-then-shrink" key="2">
                    {({ ref, style }) => <Root style={style} innerRef={ref} />}
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </>
      )}
    </Toggler>
  ))
  .add('managed altogether', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <>
          <NoMarginBody className="" />
          <StickyButton onClick={toggle}>toggle</StickyButton>

          {shown ? (
            <BabaManager key="c">
              {props => (
                <Container background="green" {...props}>
                  <Baba name="managed-altogether" key="1">
                    <Move>
                      <Wait>
                        <CircleShrink background="green">
                          {({ ref, style }) => <BigRoot style={style} innerRef={ref} />}
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
                <Container background="white" {...props}>
                  <Baba name="managed-altogether" key="2">
                    <Move delay={100}>
                      <CircleExpand background="green">
                        {({ ref, style }) => <Root style={style} innerRef={ref} />}
                      </CircleExpand>
                    </Move>
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </>
      )}
    </Toggler>
  ));
