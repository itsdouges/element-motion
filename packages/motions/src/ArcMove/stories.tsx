import * as React from 'react';
import { storiesOf } from '@storybook/react';
import * as Common from '@element-motion/dev';
import styled from 'styled-components';
import Motion from '../../../core/src/Motion';
import ArcMove from './index';

const Container = styled.div<any>`
  background: red;
  height: 100px;
  width: 100px;

  ${props =>
    props.sticky &&
    `
    position: absolute;
    bottom: 0;
    right: 0;
    margin-left: 0 !important;
  `};

  ${props =>
    props.left &&
    `
    margin-left: auto;
    left: 0;
  `};
`;

storiesOf('@element-motion/core/ArcMove', module)
  .add('Default', () => (
    <Common.Toggler>
      {toggler => (
        <Motion triggerSelfKey={`${toggler.shown}`}>
          <ArcMove>
            {anim => <Container onClick={toggler.toggle} sticky={toggler.shown} {...anim} />}
          </ArcMove>
        </Motion>
      )}
    </Common.Toggler>
  ))
  .add('Left', () => (
    <Common.Toggler>
      {toggler => (
        <Motion triggerSelfKey={`${toggler.shown}`}>
          <ArcMove>
            {anim => <Container onClick={toggler.toggle} sticky={toggler.shown} left {...anim} />}
          </ArcMove>
        </Motion>
      )}
    </Common.Toggler>
  ));
