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
} from '@element-motion/utils';
import { MotionProps } from '../types';

export interface ScaleProps extends CollectorChildrenProps, MotionProps {}

const buildKeyframes = (elements: MotionData, duration: number, bezierCurve: string) => {
  const frameTime = 1000 / 60;
  const nFrames = Math.round(duration / frameTime);
  const percentIncrement = 100 / nFrames;
  const originBoundingBox = elements.origin.elementBoundingBox;
  const destinationBoundingBox = elements.destination.elementBoundingBox;
  const timingFunction = bezierToFunc(bezierCurve, duration);

  const startX = originBoundingBox.size.width / destinationBoundingBox.size.width;
  const startY = originBoundingBox.size.height / destinationBoundingBox.size.height;
  const endX = 1;
  const endY = 1;
  const animation: string[] = [];
  const inverseAnimation: string[] = [];

  for (let i = 0; i <= nFrames; i += 1) {
    const step = Number(timingFunction(i / nFrames).toFixed(5));
    const percentage = Number((i * percentIncrement).toFixed(5));
    const xScale = Number((startX + (endX - startX) * step).toFixed(5));
    const yScale = Number((startY + (endY - startY) * step).toFixed(5));
    const invScaleX = (1 / xScale).toFixed(5);
    const invScaleY = (1 / yScale).toFixed(5);

    animation.push(`
      ${percentage}% {
        transform: scale3d(${xScale}, ${yScale}, 1);
      }`);

    inverseAnimation.push(`
      ${percentage}% {
        transform: scale3d(${invScaleX}, ${invScaleY}, 1);
      }`);
  }

  return {
    animation: keyframes(animation),
    inverseAnimation: keyframes(inverseAnimation),
  };
};

export const INVERSE_SCALE_CLASS_NAME = 'inVRsE-sCle';

const Scale: React.FC<ScaleProps> = ({
  children,
  duration = 'dynamic',
  timingFunction = standard(),
}: ScaleProps) => {
  let calculatedDuration: number;
  let animation: string;
  let inverseAnimation: string;

  return (
    <Collector
      data={{
        action: CollectorActions.motion,
        payload: {
          beforeAnimate: (elements, onFinish, setChildProps) => {
            const originBoundingBox = elements.origin.elementBoundingBox;
            const destinationBoundingBox = elements.destination.elementBoundingBox;
            const scaleToX = originBoundingBox.size.width / destinationBoundingBox.size.width;
            const scaleToY = originBoundingBox.size.height / destinationBoundingBox.size.height;
            const inverseScaleToX = 1 / scaleToX;
            const inverseScaleToY = 1 / scaleToY;

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
                transform: combine(`scale3d(${scaleToX}, ${scaleToY}, 1)`, '')(prevStyle.transform),
                animationDuration: `${calculatedDuration}ms`,
                animationName: combine(animation)(prevStyle.animationName),
              }),
              className: () =>
                css({
                  [`.${INVERSE_SCALE_CLASS_NAME}`]: {
                    ...common,
                    transform: `scale3d(${inverseScaleToX}, ${inverseScaleToY}, 1)`,
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
                    [`.${INVERSE_SCALE_CLASS_NAME}`]: {
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

export default Scale;
