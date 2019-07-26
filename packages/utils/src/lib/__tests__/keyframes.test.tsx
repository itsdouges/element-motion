import { composeKeyframes, KeyframeDefinition } from '../keyframes';

describe('@element-motion/utils/keyframes', () => {
  it('should compose keyframes with prev in the first position', () => {
    const prev: KeyframeDefinition = {
      0: ['transform', 'scale(1)'],
    };
    const next: KeyframeDefinition = {
      0: ['transform', 'translateX(100px)'],
    };

    const composed = composeKeyframes(prev, next);

    expect(composed).toEqual({
      0: ['transform', 'scale(1) translateX(100px)'],
    });
  });
});
