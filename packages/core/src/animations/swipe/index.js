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
    styles: {
      position: 'fixed',
      left: '-50px',
      right: '-50px',
      top: '-50px',
      bottom: '-50px',
      zIndex: options.zIndex || 9997,
      background: options.background,
    },
    keyframes: [{
      transform: 'translateY(100%)',
    }, {
      transform: 'translateY(0)',
    }],
  };
}
