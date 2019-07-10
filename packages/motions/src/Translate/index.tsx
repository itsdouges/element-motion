import * as React from 'react';
import { css, keyframes, cx } from 'emotion';
import {
  Collector,
  CollectorChildrenProps,
  CollectorActions,
  MotionData,
  bezierToFunc,
  combine,
  standard,
  dynamic,
  recalculateElementBoundingBoxFromScroll,
} from '@element-motion/utils';
import { MotionProps } from '../types';

export interface TranslateProps extends CollectorChildrenProps, MotionProps {}

const buildKeyframes = (elements: MotionData, duration: number, bezierCurve: string) => {
  const frameTime = 1000 / 60;
  const nFrames = Math.round(duration / frameTime);
  const percentIncrement = 100 / nFrames;
  const originBoundingBox = recalculateElementBoundingBoxFromScroll(
    elements.origin.elementBoundingBox
  );
  const destinationBoundingBox = elements.destination.elementBoundingBox;
  const timingFunction = bezierToFunc(bezierCurve, duration);

  const startX = originBoundingBox.location.left - destinationBoundingBox.location.left;
  const startY = originBoundingBox.location.top - destinationBoundingBox.location.top;
  const endX = 0;
  const endY = 0;
  const animation: string[] = [];
  const inverseAnimation: string[] = [];

  for (let i = 0; i <= nFrames; i += 1) {
    const step = Number(timingFunction(i / nFrames).toFixed(5));
    const percentage = Number((i * percentIncrement).toFixed(5));
    const translateToX = Number((startX + (endX - startX) * step).toFixed(5));
    const translateToY = Number((startY + (endY - startY) * step).toFixed(5));
    const inverseTranslateToX = -translateToX;
    const inverseTranslateToY = -translateToY;

    animation.push(`
      ${percentage}% {
        transform: translate3d(${translateToX}px, ${translateToY}px, 0);
      }`);

    inverseAnimation.push(`
      ${percentage}% {
        transform: translate3d(${inverseTranslateToX}px, ${inverseTranslateToY}px, 0);
      }`);
  }

  return {
    animation: keyframes(animation),
    inverseAnimation: keyframes(inverseAnimation),
  };
};

export const INVERSE_TRANSLATE_CLASS_NAME = 'inVRsE-tRnsFrm';

const Translate: React.FC<TranslateProps> = ({
  children,
  duration = 'dynamic',
  timingFunction = standard(),
}: TranslateProps) => {
  let calculatedDuration: number;
  let animation: string;
  let inverseAnimation: string;

  return (
    <Collector
      data={{
        action: CollectorActions.motion,
        payload: {
          beforeAnimate: (elements, onFinish, setChildProps) => {
            const originBoundingBox = recalculateElementBoundingBoxFromScroll(
              elements.origin.elementBoundingBox
            );
            const destinationBoundingBox = elements.destination.elementBoundingBox;
            const translateToX =
              originBoundingBox.location.left - destinationBoundingBox.location.left;
            const translateToY =
              originBoundingBox.location.top - destinationBoundingBox.location.top;
            const inverseTranslateToX = -translateToX;
            const inverseTranslateToY = -translateToY;

            calculatedDuration =
              duration === 'dynamic'
                ? dynamic(
                    elements.origin.elementBoundingBox,
                    elements.destination.elementBoundingBox
                  )
                : duration;

            ({ animation, inverseAnimation } = buildKeyframes(
              elements,
              calculatedDuration,
              timingFunction
            ));

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
                transform: combine(`translate3d(${translateToX}px, ${translateToY}px, 0)`, '')(
                  prevStyle.transform
                ),
                animationDuration: `${calculatedDuration}ms`,
                animationName: combine(animation)(prevStyle.animationName),
              }),
              className: () =>
                css({
                  [`.${INVERSE_TRANSLATE_CLASS_NAME}`]: {
                    ...common,
                    transform: `translate3d(${inverseTranslateToX}px, ${inverseTranslateToY}px, 0)`,
                    animationDuration: `${calculatedDuration}ms`,
                    animationName: inverseAnimation,
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
