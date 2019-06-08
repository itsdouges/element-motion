import * as React from 'react';
import styled from 'styled-components'; // eslint-disable-line
import { Toggler } from '@element-motion/dev'; // eslint-disable-line
import Motion from '../../../Motion';
import Noop from '../../Noop';
import Target from '../../../FocalTarget';
import FocalReveal from '../index';

type Appearance = 'left' | 'center' | 'right';

const justifyContentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const List = styled.div<{ appearance: Appearance }>`
  display: flex;
  justify-content: ${props => justifyContentMap[props.appearance]};
`;

interface ListItemProps {
  height: number;
  width: number;
}

const ListItem = styled.div<ListItemProps>`
  background-color: #dc143c;
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
    color: rgba(255, 255, 255, 0.9);
    font-size: 24px;
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
  background: rgb(210, 215, 225);
  margin: 0 auto;
  height: ${props =>
    props.orientation === 'both' || props.orientation === 'vertical'
      ? props.height * 3
      : props.height}px;
  max-width: ${props =>
    props.orientation === 'both' || props.orientation === 'horizontal'
      ? props.width * 3
      : props.width}px;
`;

export const build = (
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
            <Motion name={`reveal-move-${orientation}-${appearance}-${useClipPath}`}>
              <FocalReveal
                childrenTransformX={useClipPath || orientation === 'vertical'}
                childrenTransformY={useClipPath || orientation === 'horizontal'}
                useClipPath={useClipPath}
              >
                {motion => (
                  <ListItem {...motion} onClick={() => toggle()} width={width} height={height} />
                )}
              </FocalReveal>
            </Motion>
          </List>
        )}

        {shown && (
          <Motion name={`reveal-move-${orientation}-${appearance}-${useClipPath}`}>
            <Noop>
              {motion => (
                <TallListItem {...motion} width={width} height={height} orientation={orientation}>
                  <Target>
                    {target => (
                      <ListItem
                        width={width}
                        height={height}
                        onClick={() => toggle()}
                        ref={target.ref}
                      />
                    )}
                  </Target>
                </TallListItem>
              )}
            </Noop>
          </Motion>
        )}
      </React.Fragment>
    )}
  </Toggler>
);
