import * as React from 'react';
import { css, cx } from 'emotion';
import {
  Collector,
  CollectorChildrenProps,
  CollectorActions,
  combine,
  standard,
  keyframes,
  dynamic,
  composeKeyframes,
  recalculateElementBoundingBoxFromScroll,
} from '@element-motion/utils';
import { MotionProps } from '../types';

export interface TranslateProps extends CollectorChildrenProps, MotionProps {}

export const INVERSE_TRANSLATE_CLASS_NAME = 'inVRsE-tRnsFrm';

const Translate: React.FC<TranslateProps> = ({
  children,
  duration = 'dynamic',
  timingFunction = standard(),
}: TranslateProps) => {
  let calculatedDuration: number;

  return (
    <Collector
      data={{
        action: CollectorActions.motion,
        payload: {
          beforeAnimate: (elements, onFinish, setChildProps, { animationName }) => {
            const originBoundingBox = recalculateElementBoundingBoxFromScroll(
              elements.origin.elementBoundingBox
            );
            const destinationBoundingBox = elements.destination.elementBoundingBox;
            const startX = originBoundingBox.location.left - destinationBoundingBox.location.left;
            const startY = originBoundingBox.location.top - destinationBoundingBox.location.top;
            const startInverseX = -startX;
            const startInverseY = -startY;
            const endX = 0;
            const endY = 0;

            calculatedDuration =
              duration === 'dynamic'
                ? dynamic(
                    elements.origin.elementBoundingBox,
                    elements.destination.elementBoundingBox
                  )
                : duration;

            const { animation, inverseAnimation } = keyframes(calculatedDuration, timingFunction)(
              step => {
                const translateToX = Number((startX + (endX - startX) * step).toFixed(5));
                const translateToY = Number((startY + (endY - startY) * step).toFixed(5));
                const inverseTranslateToX = -translateToX;
                const inverseTranslateToY = -translateToY;
                return [
                  'transform',
                  `translate3d(${translateToX}px, ${translateToY}px, 0)`,
                  `translate3d(${inverseTranslateToX}px, ${inverseTranslateToY}px, 0)`,
                ];
              }
            );

            const common = {
              willChange: 'transform',
              transformOrigin: 'top left',
              animationTimingFunction: 'step-end',
              animationFillMode: 'forwards',
              animationPlayState: 'paused',
            };

            setChildProps({
              style: prevStyle => ({
                ...prevStyle,
                ...common,
                transform: combine(`translate3d(${startX}px, ${startY}px, 0)`, '')(
                  prevStyle.transform
                ),
                animationDuration: `${calculatedDuration}ms`,
                animationName: combine(animationName('transform'))(prevStyle.animationName),
              }),
              keyframes: getPrevKeyframes => ({
                transform: composeKeyframes(getPrevKeyframes('transform'), animation),
                inverseTransform: composeKeyframes(
                  getPrevKeyframes('inverseTransform'),
                  inverseAnimation
                ),
              }),
              className: () =>
                css({
                  [`.${INVERSE_TRANSLATE_CLASS_NAME}`]: {
                    ...common,
                    transform: `translate3d(${startInverseX}px, ${startInverseY}px, 0)`,
                    animationDuration: `${calculatedDuration}ms`,
                    animationName: animationName('inverseTransform'),
                  },
                }),
            });

            onFinish();
          },
          animate: (_, onFinish, setChildProps) => {
            setChildProps({
              style: prevStyle => ({
                ...prevStyle,
                animationPlayState: 'running',
              }),
              className: prevClassName =>
                cx(
                  prevClassName,
                  css({
                    [`.${INVERSE_TRANSLATE_CLASS_NAME}`]: {
                      animationPlayState: 'running',
                    },
                  })
                ),
            });

            setTimeout(onFinish, calculatedDuration);
          },
        },
      }}
    >
      {children}
    </Collector>
  );
};

export default Translate;
