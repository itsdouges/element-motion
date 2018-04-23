import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import data from './data';
import Album from './Album';

const BigContainer = styled.div`
  width: 400px;
  height: 532px;
`;

storiesOf('GoogleMusic/Components/Album', module)
  .add('small', () => <Album {...data[0]} baba="" emphasis={false} />)
  .add('large', () => (
    <BigContainer>
      <Album emphasis baba="" {...data[0]} />
    </BigContainer>
  ));
