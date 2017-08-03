// @flow
import calculateFromSizeLocation from '../../../packages/core/src/lib/location';

export default function spinners (fromElement, options, metadata) {
  const { ...sizeLocation } = calculateFromSizeLocation(fromElement, metadata);

  console.log('test')
  return {
    name: 'spinners',
    options: {
      cloneElement: true,
      ...metadata,
    },
    styles: {
      ...sizeLocation,
      margin: 0,
      transformOrigin: '0 0',
      position: 'absolute',
      zIndex: options.zIndex || 9999,
    },
    keyframes: [{
      transform: 'rotate(0deg)',
    }, {
      transform: 'rotate(359deg)',
    }],
  };
}
