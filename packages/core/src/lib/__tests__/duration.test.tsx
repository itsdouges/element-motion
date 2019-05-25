import { dynamic, getScreenSizeWeight } from '../duration';
import { ElementBoundingBox, getWindowDimensions } from '../dom';

jest.mock('../dom');

describe('duration util', () => {
  const setViewportDimensions = (width: number, height: number) => {
    (getWindowDimensions as jest.Mock).mockReturnValue({ width, height });
  };

  const createBoundingBox = (box: {
    left: number;
    top: number;
    width: number;
    height: number;
  }): ElementBoundingBox => ({
    location: {
      left: box.left,
      top: box.top,
    },
    size: {
      width: box.width,
      height: box.height,
    },
    raw: {} as any,
  });

  describe('dynamic duration', () => {
    beforeEach(() => {
      setViewportDimensions(500, 1000);
    });

    it('should return medium duration when moving 10 to 49 percent of the screen', () => {
      const origin = createBoundingBox({
        height: 50,
        width: 50,
        top: 0,
        left: 0,
      });
      const destination = createBoundingBox({
        height: 50,
        width: 50,
        top: 400,
        left: 0,
      });

      const duration = dynamic(origin, destination);

      expect(duration).toEqual(250);
    });

    it('should return medium duration when expading 10 to 49 percent of the screen', () => {
      const origin = createBoundingBox({
        height: 50,
        width: 500,
        top: 0,
        left: 0,
      });
      const destination = createBoundingBox({
        height: 300,
        width: 500,
        top: 0,
        left: 0,
      });

      const duration = dynamic(origin, destination);

      expect(duration).toEqual(250);
    });

    it('should return large duration when moving over 50 percent of the screen', () => {
      const origin = createBoundingBox({
        height: 50,
        width: 50,
        top: 0,
        left: 0,
      });
      const destination = createBoundingBox({
        height: 50,
        width: 50,
        top: 600,
        left: 0,
      });

      const duration = dynamic(origin, destination);

      expect(duration).toEqual(300);
    });

    it('should return large duration when expanding over 50 percent of the screen', () => {
      const origin = createBoundingBox({
        height: 50,
        width: 50,
        top: 0,
        left: 0,
      });
      const destination = createBoundingBox({
        height: 1000,
        width: 500,
        top: 0,
        left: 0,
      });

      const duration = dynamic(origin, destination);

      expect(duration).toEqual(300);
    });
  });

  describe('viewport weight', () => {
    it('should return small weight', () => {
      const weight = getScreenSizeWeight(500);

      expect(weight).toEqual(1);
    });

    it('should return weight for medium', () => {
      const weight = getScreenSizeWeight(1100);

      expect(weight).toEqual(1.22);
    });

    it('should return weight for large', () => {
      const weight = getScreenSizeWeight(1440);

      expect(weight).toEqual(1.5);
    });
  });
});
