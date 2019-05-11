import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Toggler } from 'yubaba-common';
import Baba from '../../Baba';
import Target from '../../FocalTarget';
import FocalConcealMove from './index';

const Container = styled.div`
  margin: 100px auto;
  display: flex;
  justify-content: center;
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
  height: ${props =>
    props.orientation === 'both' || props.orientation === 'vertical'
      ? props.height * 3
      : props.height}px;
  width: ${props =>
    props.orientation === 'both' || props.orientation === 'horizontal'
      ? props.width * 3
      : props.width}px;
`;

const build = (width: number, height: number, orientation: Orientation) => (
  <Toggler>
    {({ shown, toggle }) => (
      <React.Fragment>
        {shown && (
          <Baba name={`focal-conceal-move-${orientation}`}>
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
          </Baba>
        )}

        {shown || (
          <Baba name={`focal-conceal-move-${orientation}`}>
            <FocalConcealMove>
              {baba => (
                // We use a wrapper div here because the child centers it's children via flexbox.
                // Since it centers it with flexbox when we transition it around our assumptions change
                // when it's height changes.
                <div {...baba}>
                  <TallListItem width={width} height={height} orientation={orientation}>
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
                </div>
              )}
            </FocalConcealMove>
          </Baba>
        )}
      </React.Fragment>
    )}
  </Toggler>
);

storiesOf('yubaba/FocalConcealMove', module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('TargetHeight', () => build(200, 200, 'vertical'))
  .add('TargetWidth', () => build(200, 200, 'horizontal'))
  .add('TargetBoth', () => build(200, 200, 'both'));
