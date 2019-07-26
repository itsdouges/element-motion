import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Translate from '../Translate';
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

const origin = {
  topLeft: 'top:0;left: 0;',
  topRight: 'top:0;right:0;',
  bottomRight: 'bottom:0;right:0;',
  bottomLeft: 'bottom:0;left:0;',
  midLeft: 'top:0;left:50%;',
};

const Block = styled.div<any>`
  position: absolute;
  width: ${props => props.size || 100}px;
  height: ${props => props.size || 100}px;
  background-color: red;
  ${props => origin[props.origin]};
`;

storiesOf('@element-motion/motions/Scale', module)
  .add('Multiple', () => (
    <Toggler>
      {toggler => (
        <>
          <Motion triggerSelfKey={toggler.shown}>
            <Scale>
              {motion => (
                <Block
                  origin="topLeft"
                  {...motion}
                  onClick={() => toggler.toggle()}
                  size={toggler.shown ? 200 : 100}
                />
              )}
            </Scale>
          </Motion>

          <Motion triggerSelfKey={toggler.shown}>
            <Scale>
              {motion => (
                <Block
                  origin="midLeft"
                  {...motion}
                  onClick={() => toggler.toggle()}
                  size={toggler.shown ? 300 : 100}
                />
              )}
            </Scale>
          </Motion>
        </>
      )}
    </Toggler>
  ))

  .add('OriginTopLeft', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Scale>
            {motion => (
              <Block
                origin="topLeft"
                {...motion}
                onClick={() => toggler.toggle()}
                size={toggler.shown ? 300 : 100}
              />
            )}
          </Scale>
        </Motion>
      )}
    </Toggler>
  ))
  .add('ComposedWithTranslate', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Translate>
            <Scale>
              {motion => (
                <Block
                  origin={toggler.shown ? 'topRight' : 'topLeft'}
                  {...motion}
                  onClick={() => toggler.toggle()}
                  size={toggler.shown ? 300 : 100}
                />
              )}
            </Scale>
          </Translate>
        </Motion>
      )}
    </Toggler>
  ))
  .add('OriginTopRight', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Scale transformOrigin="top right">
            {motion => (
              <Block
                origin="topRight"
                {...motion}
                onClick={() => toggler.toggle()}
                size={toggler.shown ? 300 : 100}
              />
            )}
          </Scale>
        </Motion>
      )}
    </Toggler>
  ))
  .add('OriginBottomRight', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Scale transformOrigin="bottom right">
            {motion => (
              <Block
                origin="bottomRight"
                {...motion}
                onClick={() => toggler.toggle()}
                size={toggler.shown ? 300 : 100}
              />
            )}
          </Scale>
        </Motion>
      )}
    </Toggler>
  ))
  .add('OriginBottomLeft', () => (
    <Toggler>
      {toggler => (
        <Motion triggerSelfKey={toggler.shown}>
          <Scale transformOrigin="bottom left">
            {motion => (
              <Block
                origin="bottomLeft"
                {...motion}
                onClick={() => toggler.toggle()}
                size={toggler.shown ? 300 : 100}
              />
            )}
          </Scale>
        </Motion>
      )}
    </Toggler>
  ))
  .add('WithInverse', () => (
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
