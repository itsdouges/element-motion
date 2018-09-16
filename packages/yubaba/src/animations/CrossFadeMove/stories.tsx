import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba, { Move } from '../../../src';
import * as Common from 'yubaba-common';

const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

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

const imageA = 'https://picsum.photos/200/300?a';
const imageB = 'https://picsum.photos/200/300?b';

storiesOf('yubaba/CrossFadeMove', module)
  .add('Default', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-square" key="1">
              <Move>{({ ref, style }) => <Root src={imageA} style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-square" key="2">
              <Move>
                {({ ref, style }) => <RightRoot src={imageB} style={style} innerRef={ref} />}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('WithMargin', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-square-margin" key="1">
              <Move>
                {({ ref, style }) => <Root src={imageA} margin style={style} innerRef={ref} />}
              </Move>
            </Baba>
          ) : (
            <Baba name="square-to-square-margin" key="2">
              <Move>
                {({ ref, style }) => <RightRoot src={imageB} style={style} innerRef={ref} />}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SmallToLarge', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-big-square" key="1">
              <Move>{({ ref, style }) => <Root src={imageA} style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-big-square" key="2">
              <Move>
                {({ ref, style }) => <BigRightRoot src={imageB} style={style} innerRef={ref} />}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SquareToRectangle', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-rectangle" key="1">
              <Move>{({ ref, style }) => <Root src={imageA} style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-rectangle" key="2">
              <Move>
                {({ ref, style }) => <Rectangle src={imageB} margin style={style} innerRef={ref} />}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SquareToCircle', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-circle" key="1">
              <Move>{({ ref, style }) => <Root src={imageA} style={style} innerRef={ref} />}</Move>
            </Baba>
          ) : (
            <Baba name="square-to-circle" key="2">
              <Move>
                {({ ref, style }) => <Circle src={imageB} style={style} innerRef={ref} />}
              </Move>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('OffscreenLargeToSmall', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <LongContainer>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <div>
              <Padding data-big />
              <Baba name="offscreen-big-square-to-small-square" key="2">
                <Move>
                  {({ ref, style }) => <BigRightRoot src={imageA} style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </div>
          ) : (
            <Baba name="offscreen-big-square-to-small-square" key="1">
              <Move>{({ ref, style }) => <Root src={imageB} style={style} innerRef={ref} />}</Move>
            </Baba>
          )}
        </LongContainer>
      )}
    </Common.Toggler>
  ))
  .add('SmallWithMarginToOffscreenLargeWithMargin', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <Baba name="square-to-offscreen-big-square-with-margin" key="1">
              <Move>
                {({ ref, style }) => <Root src={imageA} margin style={style} innerRef={ref} />}
              </Move>
            </Baba>
          ) : (
            <div>
              <Padding data-yolo />
              <Baba name="square-to-offscreen-big-square-with-margin" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot src={imageB} margin style={style} innerRef={ref} />
                  )}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('IndescriminateSizeToSmall', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <SquareContainer>
              <Baba name="indescriminate-size-to-square" key="1">
                <Move>
                  {({ ref, style }) => <FillSpace src={imageA} style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </SquareContainer>
          ) : (
            <div>
              <Baba name="indescriminate-size-to-square" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot src={imageB} margin style={style} innerRef={ref} />
                  )}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('LongPageSmallToLarge', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown ? (
            <LongContainer>
              <RestoreScrollOnMount />
              <MediumContainer />
              <Baba name="long-scroll-to-no-scroll" key="1">
                <Move>
                  {({ ref, style }) => <Root src={imageA} style={style} innerRef={ref} />}
                </Move>
              </Baba>
            </LongContainer>
          ) : (
            <div>
              <Common.ScrollTopOnMount />
              <Baba name="long-scroll-to-no-scroll" key="2">
                <Move>
                  {({ ref, style }) => (
                    <BigRightRoot src={imageB} margin style={style} innerRef={ref} />
                  )}
                </Move>
              </Baba>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ))
  .add('SmallToElementThatNeverUnmounts', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {!shown && (
            <Baba name="one-already-mounted" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root src={imageA} style={{ ...style, float: 'left' }} innerRef={ref} />
                )}
              </Move>
            </Baba>
          )}

          <Baba name="one-already-mounted" key="2" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  src={imageB}
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
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          {shown && (
            <Baba name="one-already-mounted-reversed" key="1">
              <Move>
                {({ ref, style }) => (
                  <Root
                    src={imageA}
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
                {({ ref, style }) => <RightRoot src={imageB} style={style} innerRef={ref} />}
              </Move>
            </Baba>
          </LongContainer>
        </div>
      )}
    </Common.Toggler>
  ))
  .add('BothNeverUnmounting', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          <Baba name="both-already-mounted" key="1" in={!shown}>
            <Move>
              {({ ref, style }) => (
                <Root src={imageA} style={{ ...style, float: 'left' }} innerRef={ref} />
              )}
            </Move>
          </Baba>

          <Baba name="both-already-mounted" key="2" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  src={imageB}
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
  .add('BothNeverUnmountingReversed', () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>toggle</Common.StickyButton>
          <Baba name="both-already-mounted-reversed" key="1" in={!!shown}>
            <Move>
              {({ ref, style }) => (
                <Root src={imageA} style={{ ...style, float: 'left' }} innerRef={ref} />
              )}
            </Move>
          </Baba>

          <Baba name="both-already-mounted-reversed" key="2" in={!shown}>
            <Move>
              {({ ref, style }) => (
                <RightRoot
                  src={imageB}
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
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Common.StickyButton onClick={() => toggle()}>
            {!shown ? 'toggle' : 'abort'}
          </Common.StickyButton>
          {!shown ? (
            <Baba name="aborting" key="1">
              <Move duration={5000}>
                {({ ref, style }) => <Root src={imageA} style={style} innerRef={ref} />}
              </Move>
            </Baba>
          ) : (
            <Baba name="aborting" key="2">
              {({ ref, style }) => <RightRoot src={imageB} style={style} innerRef={ref} />}
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ));
