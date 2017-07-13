// @flow

type Options = {
  zIndex?: number,
  background: string,
};

export default function swipe (element: HTMLElement, options: Options) {
  return {
    name: 'swipe-up',
    options: {
      newElement: true,
      easing: 'ease-out',
    },
    from: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: options.zIndex || 9997,
      background: options.background,
    },
    to: {
      keyframes: [{
        transform: 'translateY(100%)',
      }, {
        transform: 'translateY(0)',
      }],
    },
  };
}
