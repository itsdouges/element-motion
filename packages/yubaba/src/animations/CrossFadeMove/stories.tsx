import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Move } from '../../../src';
import Toggler from '../../../examples/common/Toggler';
import StickyButton from '../../../examples/common/StickyButton';
import createScrollStore from '../../../examples/common/RestoreScrollOnMount';
import ScrollTopOnMount from '../../../examples/common/ScrollTopOnMount';

const RestoreScrollOnMount = createScrollStore();

interface RootProps {
  margin?: boolean;
}

const Root = styled.img`
  position: relative;
  width: 105px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const FillSpace = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;

storiesOf('CrossFadeMove', module)
  .add('Default', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-square" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="square-to-square" key="2">
              <Move>
                {({ ref, style }) => (
                  <RightRoot
                    src={require('../../../examples/guessWho/images/female.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('WithMargin', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-square-margin" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    margin
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="square-to-square-margin" key="2">
              <Move>
                {({ ref, style }) => (
                  <RightRoot
                    src={require('../../../examples/guessWho/images/male.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('SmallToLarge', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-big-square" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="square-to-big-square" key="2">
              <Move>
                {({ ref, style }) => (
                  <BigRightRoot
                    src={require('../../../examples/guessWho/images/female.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('SquareToRectangle', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-rectangle" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="square-to-rectangle" key="2">
              <Move>
                {({ ref, style }) => (
                  <Rectangle
                    src={require('../../../examples/guessWho/images/male.png')}
                    margin
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('SquareToCircle', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-circle" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="square-to-circle" key="2">
              <Move>
                {({ ref, style }) => (
                  <Circle
                    src={require('../../../examples/guessWho/images/female.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('OffscreenLargeToSmall', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <LongContainer>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <div>
              <Padding data-big />
              <Baba name="offscreen-big-square-to-small-square" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot
                      src={require('../../../examples/guessWho/images/guess-who.png')}
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </div>
          ) : (
            <Baba name="offscreen-big-square-to-small-square" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/female2.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}
        </LongContainer>
      )}
    </Toggler>
  ))
  .add('SmallWithMarginToOffscreenLargeWithMargin', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Baba name="square-to-offscreen-big-square-with-margin" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    margin
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <div>
              <Padding data-yolo />
              <Baba name="square-to-offscreen-big-square-with-margin" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot
                      src={require('../../../examples/guessWho/images/female.png')}
                      margin
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('IndescriminateSizeToSmall', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <SquareContainer>
              <Baba name="indescriminate-size-to-square" key="1">
                <Move>
                  {({ ref, style }) => (
                    <FillSpace
                      src={require('../../../examples/guessWho/images/guess-who.png')}
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </SquareContainer>
          ) : (
            <div>
              <Baba name="indescriminate-size-to-square" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot
                      src={require('../../../examples/guessWho/images/male.png')}
                      margin
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('LongPageSmallToLarge', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <LongContainer>
              <RestoreScrollOnMount />
              <MediumContainer />
              <Baba name="long-scroll-to-no-scroll" key="1">
                <Move>
                  {({ ref, style }) => (
                    <Root
                      src={require('../../../examples/guessWho/images/guess-who.png')}
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </LongContainer>
          ) : (
            <div>
              <ScrollTopOnMount />
              <Baba name="long-scroll-to-no-scroll" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot
                      src={require('../../../examples/guessWho/images/female2.png')}
                      margin
                      style={style}
                      innerRef={ref}
                    />
                  )}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('SmallToElementThatNeverUnmounts', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown && (
            <Baba name="one-already-mounted" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={{ ...style, float: 'left' }}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          )}

          <Baba name="one-already-mounted" key="2" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  src={require('../../../examples/guessWho/images/female.png')}
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
    </Toggler>
  ))
  .add('SmallToElementThatNeverUnmountsReversed', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {shown && (
            <Baba name="one-already-mounted-reversed" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={{ ...style, position: 'fixed', top: 0, left: 0 }}
                    innerRef={ref}
                  />
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
              <Move>
                {({ ref, style }) => (
                  <RightRoot
                    src={require('../../../examples/guessWho/images/female.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          </LongContainer>
        </div>
      )}
    </Toggler>
  ))
  .add('BothNeverUnmounting', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          <Baba name="both-already-mounted" key="1" in={!shown}>
            <Move>
              {({ ref, style }) => (
                <Root
                  src={require('../../../examples/guessWho/images/guess-who.png')}
                  style={{ ...style, float: 'left' }}
                  innerRef={ref}
                />
              )}
            </Move>
          </Baba>

          <Baba name="both-already-mounted" key="2" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  src={require('../../../examples/guessWho/images/female.png')}
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
    </Toggler>
  ))
  .add('BothNeverUnmountingReversed', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          <Baba name="both-already-mounted-reversed" key="1" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <Root
                  src={require('../../../examples/guessWho/images/guess-who.png')}
                  style={{ ...style, float: 'left' }}
                  innerRef={ref}
                />
              )}
            </Move>
          </Baba>

          <Baba name="both-already-mounted-reversed" key="2" in={!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  src={require('../../../examples/guessWho/images/female.png')}
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
    </Toggler>
  ))
  .add('Aborting', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>{!shown ? 'toggle' : 'abort'}</StickyButton>
          {!shown ? (
            <Baba name="aborting" key="1">
              <Move duration={5000}>
                {({ ref, style }) => (
                  <Root
                    src={require('../../../examples/guessWho/images/guess-who.png')}
                    style={style}
                    innerRef={ref}
                  />
                )}
              </Move>
            </Baba>
          ) : (
            <Baba name="aborting" key="2">
              {({ ref, style }) => (
                <RightRoot
                  src={require('../../../examples/guessWho/images/female.png')}
                  style={style}
                  innerRef={ref}
                />
              )}
            </Baba>
          )}
        </div>
      )}
    </Toggler>
  ));
