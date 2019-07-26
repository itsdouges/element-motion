import * as React from 'react';
import { css, cx } from 'emotion';
import {
  Collector,
  CollectorChildrenProps,
  CollectorActions,
  combine,
  standard,
  dynamic,
  keyframes as buildKeyframes,
  composeKeyframes,
} from '@element-motion/utils';
import { MotionProps } from '../types';

export interface ScaleProps extends CollectorChildrenProps, MotionProps {
  /**
   * Origin of the transform. Defaults to "top left".
   */
  transformOrigin?: string;
}

export const INVERSE_SCALE_CLASS_NAME = 'inVRsE-sCle';

const Scale: React.FC<ScaleProps> = ({
  children,
  duration = 'dynamic',
  timingFunction = standard(),
  transformOrigin = 'top left',
}: ScaleProps) => {
  let calculatedDuration: number;

  return (
    <Collector
      data={{
        action: CollectorActions.motion,
        payload: {
          beforeAnimate: (elements, onFinish, setChildProps, { animationName }) => {
            const originBoundingBox = elements.origin.elementBoundingBox;
            const destinationBoundingBox = elements.destination.elementBoundingBox;
            const scaleToX = originBoundingBox.size.width / destinationBoundingBox.size.width;
            const scaleToY = originBoundingBox.size.height / destinationBoundingBox.size.height;
            const inverseScaleToX = 1 / scaleToX;
            const inverseScaleToY = 1 / scaleToY;
            const endX = 1;
            const endY = 1;

            calculatedDuration =
              duration === 'dynamic'
                ? dynamic(
                    elements.origin.elementBoundingBox,
                    elements.destination.elementBoundingBox
                  )
                : duration;

            const { animation, inverseAnimation } = buildKeyframes(
              calculatedDuration,
              timingFunction
            )(step => {
              const xScale = Number((scaleToX + (endX - scaleToX) * step).toFixed(5));
              const yScale = Number((scaleToY + (endY - scaleToY) * step).toFixed(5));
              const invScaleX = (1 / xScale).toFixed(5);
              const invScaleY = (1 / yScale).toFixed(5);
              return [
                'transform',
                `scale3d(${xScale}, ${yScale}, 1)`,
                `scale3d(${invScaleX}, ${invScaleY}, 1)`,
              ];
            });

            const common = {
              transformOrigin,
              willChange: 'transform',
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
                  [`.${INVERSE_SCALE_CLASS_NAME}`]: {
                    ...common,
                    transform: `scale3d(${inverseScaleToX}, ${inverseScaleToY}, 1)`,
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
