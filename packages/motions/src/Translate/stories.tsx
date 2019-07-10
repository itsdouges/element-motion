import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Toggler, colors } from '@element-motion/dev';
import { Motion } from '@element-motion/utils';
import Translate from './index';
import InverseTranslate from './InverseTranslate';

const Menu = styled.div<any>`
  display: block;
  background-color: ${colors.red};
  border-radius: ${props => (props.isExpanded ? 3 : 1)}px;
  color: black;
  height: 200px;
  width: 200px;
  margin-left: ${props => (props.right ? 'auto' : 0)};
  cursor: pointer;
`;

storiesOf('@element-motion/motions/Translate', module)
  .add('Default', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Translate>
            {motion => (
              <Menu {...motion} right={toggler.shown} onClick={toggler.toggle}>
                hello, world
              </Menu>
            )}
          </Translate>
        </Motion>
      )}
    </Toggler>
  ))
  .add('Inverse', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Translate>
            {motion => (
              <Menu {...motion} right={toggler.shown} onClick={toggler.toggle}>
                <InverseTranslate>
                  {inverse => <div {...inverse}>hello, world</div>}
                </InverseTranslate>
              </Menu>
            )}
          </Translate>
        </Motion>
      )}
    </Toggler>
  ));
