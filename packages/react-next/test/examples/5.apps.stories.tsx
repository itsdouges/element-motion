import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import Baba, { Move, BabaManager } from '../../src';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: blue;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :after {
    content: 'click me';
    color: white;
  }
`;

const BigRoot = styled.div`
  width: 500px;
  height: 300px;
  background: blue;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :after {
    content: 'click me';
    color: white;
  }
`;

interface BackgroundProps {
  background: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: BackgroundProps) => props.background};
  height: 150vh;
`;

const ItemList = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  > * {
    margin: 10px;
  }
`;

const NoMarginBody = styled(BodyClassName)`
  margin: 0;
`;

class MultipleTargets extends React.Component {
  state = {
    shown: undefined,
  };

  select = (index?: number) => {
    this.setState({
      shown: index,
    });
  };

  renderItems() {
    const items = Array(8)
      .fill(undefined)
      .map((_, index) => (
        <Baba name={`multiple-targets-${index}`} key={index}>
          <Move delay={100}>
            {({ ref, style }) => (
              <Root onClick={() => this.select(index)} style={style} innerRef={ref} />
            )}
          </Move>
        </Baba>
      ));

    return (
      <BabaManager key="b">
        {props => (
          <Container background="white" {...props}>
            <NoMarginBody className="" />
            <ItemList>{items}</ItemList>
          </Container>
        )}
      </BabaManager>
    );
  }

  renderDetails(index?: number) {
    return (
      <BabaManager key="c">
        {props => (
          <Container background="white" {...props}>
            <NoMarginBody className="" />
            <Baba name={`multiple-targets-${index}`}>
              <Move>
                {({ ref, style }) => (
                  <BigRoot onClick={() => this.select()} style={style} innerRef={ref} />
                )}
              </Move>
            </Baba>
          </Container>
        )}
      </BabaManager>
    );
  }

  render() {
    return this.state.shown !== undefined
      ? this.renderDetails(this.state.shown)
      : this.renderItems();
  }
}

storiesOf('AppExamples', module).add('simple multiple items', () => <MultipleTargets />);
