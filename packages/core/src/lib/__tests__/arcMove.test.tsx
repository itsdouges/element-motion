import { getControlPoints } from '../arcMove';

describe('arc move util', () => {
  it('should generate control points across a circle', () => {
    const points = getControlPoints({ x: 1, y: 1 }, { x: 500, y: 500 });

    expect(points).toEqual({
      point1: { x: 274.54832081191466, y: 11.112660088688115 },
      point2: { x: 496.3399999565817, y: 226.28928754473327 },
    });
  });
});
