import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Move, Wait } from '../../src';

const Root = styled.div`
  width: 100px;
  height: 100px;
  background: green;
`;

storiesOf('basic', module)
  .add('move', () => (
    <Baba name="basic-move">
      <Move>{ref => <Root innerRef={ref} />}</Move>
    </Baba>
  ))
  .add('wait move', () => (
    <Baba name="basic-move">
      <Move>
        <Wait>
          <Move>{ref => <Root innerRef={ref} />}</Move>
        </Wait>
      </Move>
    </Baba>
  ));
