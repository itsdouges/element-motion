import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { FLIPMove as Move } from '../../../src';
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
import Toggler from '../../../examples/common/Toggler';
import StickyButton from '../../../examples/common/StickyButton';
import createScrollStore from '../../../examples/common/RestoreScrollOnMount';
import ScrollTopOnMount from '../../../examples/common/ScrollTopOnMount';
=======
import * as Common from 'yubaba-common';
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx

const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

interface RootProps {
  margin?: boolean;
}

const Root = styled.div`
  position: relative;
  width: 105px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2196f3;
  margin: ${(props: RootProps) => (props.margin ? 30 : 0)}px;
`;

const RightRoot = styled(Root)`
  float: right;
`;

const BigRightRoot = styled(RightRoot)`
  width: 315px;
  height: 480px;
`;

const MediumContainer = styled.div`
  height: 500px;
`;

const LongContainer = styled.div`
  height: 2000px;
`;

const Padding = styled.div`
  height: 90vh;
`;

const Circle = styled(RightRoot)`
  border-radius: 50%;
`;

const Rectangle = styled(RightRoot)`
  width: 200px;
`;

const SquareContainer = styled.div`
  width: 105px;
  height: 160px;
  position: relative;
`;

const FillSpace = styled.div`
  background-color: #2196f3;
  position: absolute;
  height: 100%;
  width: 100%;
`;

<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
storiesOf('FLIPMove', module)
  .add('Default', () => (
    <Toggler>
=======
storiesOf('yubaba/FLIPMove', module)
  .add('Default', () => (
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-square" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-square" key="2">
              <Move>{({ ref, style }) => <RightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('WithMargin', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-square-margin" key="1">
              <Move>{({ ref, style }) => <Root margin style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-square-margin" key="2">
              <Move>{({ ref, style }) => <RightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SmallToLarge', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-big-square" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-big-square" key="2">
              <Move>{({ ref, style }) => <BigRightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SquareToRectangle', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-rectangle" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-rectangle" key="2">
              <Move>{({ ref, style }) => <Rectangle margin style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SquareToCircle', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-circle" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-circle" key="2">
              <Move>{({ ref, style }) => <Circle style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('OffscreenLargeToSmall', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <LongContainer>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <div>
              <Padding data-big />
              <Baba name="offscreen-big-square-to-small-square" key="2">
                <Move>{({ ref, style }) => <BigRightRoot style={style} innerRef={ref} />}</Move>
              </Baba>
            </div>
          ) : (
            <Baba name="offscreen-big-square-to-small-square" key="1">
              <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </LongContainer>
      )}
    </Common.Toggler>
  ))
  .add('OffscreenLargeToSmallWithMargin', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-offscreen-big-square-with-margin" key="1">
              <Move>{({ ref, style }) => <Root margin style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <div>
              <Padding data-yolo />
              <Baba name="square-to-offscreen-big-square-with-margin" key="2">
                <Move>
                  {({ ref, style }) => <BigRightRoot margin style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('IndescriminateSizeToSmall', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <SquareContainer>
              <Baba name="indescriminate-size-to-square" key="1">
                <Move>{({ ref, style }) => <FillSpace style={style} innerRef={ref} />}</Move>
              </Baba>
            </SquareContainer>
          ) : (
            <div>
              <Baba name="indescriminate-size-to-square" key="2">
                <Move>
                  {({ ref, style }) => <BigRightRoot margin style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('LongPageToSmall', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <LongContainer>
              <RestoreScrollOnMount />
              <MediumContainer />
              <Baba name="long-scroll-to-no-scroll" key="1">
                <Move>{({ ref, style }) => <Root style={style} innerRef={ref} />}</Move>
              </Baba>
            </LongContainer>
          ) : (
            <div>
              <Common.ScrollTopOnMount />
              <Baba name="long-scroll-to-no-scroll" key="2">
                <Move>
                  {({ ref, style }) => <BigRightRoot margin style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SmallToElementThatNeverUnmounts', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown && (
            <Baba name="one-already-mounted" key="1">
              <Move>
                {({ ref, style }) => <Root style={{ ...style, float: 'left' }} innerRef={ref} />}
              </Move>
            </Baba>
          )}

          <Baba name="one-already-mounted" key="2" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  style={{
                    ...style,
                  }}
                  innerRef={ref}
                />
              )}
            </Move>
          </Baba>
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SmallToElementThatNeverUnmountsReversed', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {shown && (
            <Baba name="one-already-mounted-reversed" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root style={{ ...style, position: 'fixed', top: 0, left: 0 }} innerRef={ref} />
                )}
              </Move>
            </Baba>
          )}

          <LongContainer>
            <br />
            <br />
            <br />
            <br />
            <Baba name="one-already-mounted-reversed" key="2" in={!shown}>
              <Move>{({ ref, style }) => <RightRoot style={style} innerRef={ref} />}</Move>
            </Baba>
          </LongContainer>
        </div>
      )}
    </Common.Toggler>
  ))
  .add('BothElementThatNeverUnmounts', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          <Baba name="both-already-mounted" key="1" in={!shown}>
            <Move>
              {({ ref, style }) => <Root style={{ ...style, float: 'left' }} innerRef={ref} />}
            </Move>
          </Baba>

          <Baba name="both-already-mounted" key="2" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  style={{
                    ...style,
                  }}
                  innerRef={ref}
                />
              )}
            </Move>
          </Baba>
        </div>
      )}
    </Common.Toggler>
  ))
  .add('BothElementThatNeverUnmountsReversed', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          <Baba name="both-already-mounted-reversed" key="1" in={!!shown}>
            <Move>
              {({ ref, style }) => <Root style={{ ...style, float: 'left' }} innerRef={ref} />}
            </Move>
          </Baba>

          <Baba name="both-already-mounted-reversed" key="2" in={!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  style={{
                    ...style,
                  }}
                  innerRef={ref}
                />
              )}
            </Move>
          </Baba>
        </div>
      )}
    </Common.Toggler>
  ))
  .add('Aborting', () => (
<<<<<<< HEAD:packages/yubaba/src/animations/FLIPMove/stories.tsx
    <Toggler>
=======
    <Common.Toggler>
>>>>>>> chore: extract examples and common to their own packages:packages/yubaba/src/animations/FLIPMove/stories.tsx
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>
            {!shown ? 'toggle' : 'abort'}
          </Common.StickyButton>
          {!shown ? (
            <Baba name="aborting" key="1">
              <Move duration={5000}>
                {({ ref, style }) => <Root style={style} innerRef={ref} />}
              </Move>
            </Baba>
          ) : (
            <Baba name="aborting" key="2">
              {({ ref, style }) => <RightRoot style={style} innerRef={ref} />}
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ));
