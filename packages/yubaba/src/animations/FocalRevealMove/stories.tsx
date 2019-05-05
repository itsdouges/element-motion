import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Toggler } from 'yubaba-common';
import Baba from '../../Baba';
import Noop from '../Noop';
import Target from '../../FocalTarget';
import FocalRevealMove from './index';

type Appearance = 'left' | 'center' | 'right';

const justifyContentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const List = styled.div<{ appearance?: Appearance }>`
  margin: 100px ${props => (props.appearance === 'center' ? 'auto' : '100px')};
  display: flex;
  justify-content: ${props => justifyContentMap[props.appearance]};
`;

interface ListItemProps {
  height: number;
  width: number;
}

const ListItem = styled.div<ListItemProps>`
  background: #fea3aa;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: relative;
  cursor: pointer;

  &:before {
    content: 'click me';
    text-align: center;
    left: 0;
    right: 0;
    position: absolute;
    color: white;
    font-family: Roboto, HelveticaNeue, Arial, sans-serif;
    top: 70%;
  }

  &:after {
    content: '😊';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
  }
`;

type Orientation = 'horizontal' | 'vertical' | 'both';

interface TallListItemProps extends ListItemProps {
  orientation: Orientation;
}

const TallListItem = styled.div<TallListItemProps>`
  display: flex;
  align-items: center;
  background: #baed91;
  margin: 200px auto;
  height: ${props =>
    props.orientation === 'both' || props.orientation === 'vertical'
      ? props.height * 3
      : props.height}px;
  max-width: ${props =>
    props.orientation === 'both' || props.orientation === 'horizontal'
      ? props.width * 3
      : props.width}px;
`;

const build = (
  width: number,
  height: number,
  orientation: Orientation,
  appearance: Appearance,
  useClipPath = false
) => (
  <Toggler>
    {({ shown, toggle }) => (
      <React.Fragment>
        {shown || (
          <List appearance={appearance}>
            <Baba name={`reveal-move-${orientation}-${appearance}-${useClipPath}`}>
              <FocalRevealMove
                childrenTransformX={useClipPath || orientation === 'vertical'}
                childrenTransformY={useClipPath || orientation === 'horizontal'}
                transformX={useClipPath || appearance !== 'center'}
                useClipPath={useClipPath}
              >
                {baba => (
                  <ListItem
                    onClick={() => toggle()}
                    style={baba.style}
                    className={baba.className}
                    innerRef={baba.ref}
                    width={width}
                    height={height}
                  />
                )}
              </FocalRevealMove>
            </Baba>
          </List>
        )}

        {shown && (
          <Baba name={`reveal-move-${orientation}-${appearance}-${useClipPath}`}>
            <Noop>
              {baba => (
                <TallListItem
                  width={width}
                  height={height}
                  orientation={orientation}
                  style={baba.style}
                  className={baba.className}
                  innerRef={baba.ref}
                >
                  <Target>
                    {target => (
                      <ListItem
                        width={width}
                        height={height}
                        onClick={() => toggle()}
                        innerRef={target.ref}
                      />
                    )}
                  </Target>
                </TallListItem>
              )}
            </Noop>
          </Baba>
        )}
      </React.Fragment>
    )}
  </Toggler>
);

storiesOf('yubaba/FocalRevealMove', module)
  .add('RevealHeight/Left', () => build(200, 200, 'vertical', 'left'))
  .add('RevealWidth/Left', () => build(200, 200, 'horizontal', 'left'))
  .add('RevealBoth/Left', () => build(200, 200, 'both', 'left'))
  .add('RevealHeight/Center', () => build(200, 200, 'vertical', 'center'))
  .add('RevealWidth/Center', () => build(200, 200, 'horizontal', 'center'))
  .add('RevealBoth/Center', () => build(200, 200, 'both', 'center'))
  .add('RevealHeight/Right', () => build(200, 200, 'vertical', 'right'))
  .add('RevealWidth/Right', () => build(200, 200, 'horizontal', 'right'))
  .add('RevealBoth/Right', () => build(200, 200, 'both', 'right'))
  .add('RevealHeight/Left/ClipPath', () => build(200, 200, 'vertical', 'left', true))
  .add('RevealWidth/Left/ClipPath', () => build(200, 200, 'horizontal', 'left', true))
  .add('RevealBoth/Left/ClipPath', () => build(200, 200, 'both', 'left', true))
  .add('RevealHeight/Center/ClipPath', () => build(200, 200, 'vertical', 'center', true))
  .add('RevealWidth/Center/ClipPath', () => build(200, 200, 'horizontal', 'center', true))
  .add('RevealBoth/Center/ClipPath', () => build(200, 200, 'both', 'center', true))
  .add('RevealHeight/Right/ClipPath', () => build(200, 200, 'vertical', 'right', true))
  .add('RevealWidth/Right/ClipPath', () => build(200, 200, 'horizontal', 'right', true))
  .add('RevealBoth/Right/ClipPath', () => build(200, 200, 'both', 'right', true));
