import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { Move, BabaManager, CircleExpand, Wait } from '../../src';
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

storiesOf('Wait', module).add('move then shrink', () => (
  <Toggler>
    {({ shown, toggle }) => (
      <>
        <NoMarginBody className="" />

        <StickyButton onClick={toggle}>toggle</StickyButton>
        {!shown ? (
          <BabaManager name="move-then-shrink" key="c">
            {props => (
              <Container background="white" {...props}>
                <Baba name="move-then-shrink" key="1">
                  <CircleExpand background="green">
                    <Wait>
                      <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
                    </Wait>
                  </CircleExpand>
                </Baba>
              </Container>
            )}
          </BabaManager>
        ) : (
          <BabaManager name="move-then-shrink" key="b">
            {props => (
              <Container background="white" {...props}>
                <Baba name="move-then-shrink" key="2">
                  {({ ref, style }) => <BigRoot style={style} innerRef={ref} />}
                </Baba>
              </Container>
            )}
          </BabaManager>
        )}
      </>
    )}
  </Toggler>
));
