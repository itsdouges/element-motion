import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';

const Root = styled.div`
  color: green;
`;

storiesOf('basic', module).add('default', () => <Root>hi</Root>);
