import * as React from 'react';
import * as Common from '@element-motion/dev';
import Motion, {
  Move,
  FadeMove,
  CrossFadeMove,
  Scale,
  InverseScale,
  Translate,
  InverseTranslate,
  CircleExpand,
  CircleShrink,
  FocalTarget,
  FocalRevealMove,
  FocalConcealMove,
  Noop,
  Wait,
  VisibilityManager,
} from '@element-motion/core';
import { Block, InnerBlock, Fill } from './Block';

export const MoveExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion triggerSelfKey={shown}>
        <Move>{motion => <Block {...motion} alignSelf={shown ? 'flex-end' : 'flex-start'} />}</Move>
      </Motion>
    )}
  </Common.Togglr>
);

export const FadeMoveExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion triggerSelfKey={shown}>
        <FadeMove>
          {motion => <Block {...motion} alignSelf={shown ? 'flex-end' : 'flex-start'} />}
        </FadeMove>
      </Motion>
    )}
  </Common.Togglr>
);

export const CrossFadeMoveExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion name="cross-fade-move" key={shown}>
        <CrossFadeMove>
          {motion => (
            <Block
              {...motion}
              background={shown && 'checkered'}
              alignSelf={shown ? 'flex-end' : 'flex-start'}
            />
          )}
        </CrossFadeMove>
      </Motion>
    )}
  </Common.Togglr>
);

export const ScaleExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion triggerSelfKey={shown}>
        <Scale>
          {motion => (
            <Block {...motion} borderRadius="2px" width={shown ? '100%' : ''} overflow="hidden">
              <InnerBlock fill background="checkered" />
            </Block>
          )}
        </Scale>
      </Motion>
    )}
  </Common.Togglr>
);

export const InverseScaleExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion triggerSelfKey={shown}>
        <Scale>
          {motion => (
            <Block {...motion} borderRadius="2px" width={shown ? '100%' : ''} overflow="hidden">
              <InverseScale>
                {inverse => <InnerBlock fill {...inverse} background="checkered" />}
              </InverseScale>
            </Block>
          )}
        </Scale>
      </Motion>
    )}
  </Common.Togglr>
);

export const TranslateExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion triggerSelfKey={shown}>
        <Translate>
          {motion => (
            <Block {...motion} alignSelf={shown ? 'flex-end' : 'flex-start'}>
              <InnerBlock width="50px" height="50px" background="checkered" />
            </Block>
          )}
        </Translate>
      </Motion>
    )}
  </Common.Togglr>
);

export const InverseTranslateExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <Motion triggerSelfKey={shown}>
        <Translate>
          {motion => (
            <Block {...motion} alignSelf={shown ? 'flex-end' : 'flex-start'}>
              <InverseTranslate>
                {inverse => <InnerBlock {...inverse} background="checkered" />}
              </InverseTranslate>
            </Block>
          )}
        </Translate>
      </Motion>
    )}
  </Common.Togglr>
);

export const CircleExpandExample = () => (
  <Common.Togglr>
    {({ shown, toggle }) => (
      <Motion triggerSelfKey={shown}>
        <CircleExpand background={Common.colors.red}>
          {motion => (
            <Block {...motion} alignSelf="center" onClick={() => toggle()}>
              <InnerBlock>Click me</InnerBlock>
            </Block>
          )}
        </CircleExpand>
      </Motion>
    )}
  </Common.Togglr>
);

export const CircleShrinkExample = () => (
  <Common.Togglr>
    {({ shown, toggle }) => (
      <Motion triggerSelfKey={shown}>
        <CircleShrink background="#fff">
          {motion => (
            <Block {...motion} justifyContent="center" alignSelf="center" onClick={() => toggle()}>
              <strong>press me</strong>
            </Block>
          )}
        </CircleShrink>
      </Motion>
    )}
  </Common.Togglr>
);

export const FocalRevealExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <React.Fragment>
        {shown || (
          <Motion name="reveal-block">
            <FocalRevealMove useClipPath>
              {motion => <Block {...motion} alignSelf="center" />}
            </FocalRevealMove>
          </Motion>
        )}
        {shown && (
          <Motion name="reveal-block">
            <FocalConcealMove fadeOut={false}>
              {motion => (
                <Block {...motion} height="100%" background="checkered" alignSelf="center">
                  <FocalTarget>
                    {target => <Block width="100%" {...target} alignSelf="center" />}
                  </FocalTarget>
                </Block>
              )}
            </FocalConcealMove>
          </Motion>
        )}
      </React.Fragment>
    )}
  </Common.Togglr>
);

export const visibilityToOpacity = (props: any) => ({
  ...props,
  style: {
    opacity: props.style.visibility === 'hidden' ? 0 : 1,
  },
});

export const FineGrainedControlExample = () => (
  <Common.Togglr interval>
    {({ shown }) => (
      <VisibilityManager>
        {visibility => (
          <>
            <Fill {...visibilityToOpacity(visibility)} />
            <Motion triggerSelfKey={shown}>
              <Translate>
                {motion => (
                  <Block
                    {...motion}
                    justifyContent="center"
                    alignSelf={shown ? 'flex-end' : 'flex-start'}
                  >
                    <InverseTranslate>
                      {inverse => (
                        <div {...inverse}>
                          <Motion triggerSelfKey={shown}>
                            <Noop duration={100}>
                              <Wait>
                                <Translate>
                                  {innerMotion => (
                                    <InnerBlock
                                      {...innerMotion}
                                      width="100px"
                                      height="100px"
                                      background="red"
                                    />
                                  )}
                                </Translate>
                              </Wait>
                            </Noop>
                          </Motion>
                        </div>
                      )}
                    </InverseTranslate>
                  </Block>
                )}
              </Translate>
            </Motion>
          </>
        )}
      </VisibilityManager>
    )}
  </Common.Togglr>
);
