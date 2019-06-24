import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Toggler } from '@element-motion/dev';
import { Motion } from '@element-motion/utils';
import Scale from './index';
import InverseScale from './InverseScale';

/**
 * Very important
 * Do not put padding or margin in this else it will be scaled down.
 * It won't look correct at all.
 */
const Menu = styled.div<any>`
  display: inline-block;
  flex-direction: column;
  background-color: #393939;
  border-radius: ${props => (props.isExpanded ? 3 : 1)}px;
  color: #fff;
  box-shadow: 0 1px 5px rgba(32, 33, 36, 0.5);
  position: relative;
  overflow: ${props => props.overflow};
`;

const MenuItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const MenuButton = styled.div`
  padding: 8px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const MenuItem = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  display: block;
  padding: 8px;
  white-space: nowrap;
`;

storiesOf('@element-motion/motions/Scale', module).add('Default', () => (
  <Toggler>
    {toggler => (
      <Motion triggerSelfKey={toggler.shown}>
        <Scale duration={200}>
          {motion => (
            <Menu {...motion} isExpanded={toggler.shown} overflow="hidden">
              <InverseScale>
                {inverse => (
                  <div {...inverse}>
                    <MenuButton onClick={toggler.toggle}>Menu</MenuButton>
                    <MenuItems
                      className="target"
                      style={{ position: toggler.shown ? 'static' : 'absolute' }}
                    >
                      <MenuItem>Menu item 1</MenuItem>
                      <MenuItem>Menu item 2</MenuItem>
                      <MenuItem>Menu item 3</MenuItem>
                      <MenuItem>Menu item 4</MenuItem>
                    </MenuItems>
                  </div>
                )}
              </InverseScale>
            </Menu>
          )}
        </Scale>
      </Motion>
    )}
  </Toggler>
));
