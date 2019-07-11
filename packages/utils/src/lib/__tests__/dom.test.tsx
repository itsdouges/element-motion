import * as utils from '../dom';

describe('dom utils', () => {
  it('should return false when completely outside of viewport', () => {
    const isPartiallyInViewport = utils.isPartiallyInViewport({
      size: {
        width: 250,
        height: 250,
      },
      location: {
        left: 645.5,
        top: 469.70001220703125,
      },
      raw: {
        rect: {
          x: 645.5,
          y: -734.2999877929688,
          width: 250,
          height: 250,
          top: -734.2999877929688,
          right: 895.5,
          bottom: -484.29998779296875,
          left: 645.5,
        },
        scrollTop: 1204,
        scrollLeft: 0,
      },
    });

    expect(isPartiallyInViewport).toEqual(false);
  });

  it('should return true when partially inside viewport', () => {
    const isPartiallyInViewport = utils.isPartiallyInViewport({
      size: {
        width: 250,
        height: 250,
      },
      location: {
        left: 645.5,
        top: 855.6999969482422,
      },
      raw: {
        rect: {
          x: 645.5,
          y: 52.69999694824219,
          width: 250,
          height: 250,
          top: 52.69999694824219,
          right: 895.5,
          bottom: 302.6999969482422,
          left: 645.5,
        },
        scrollTop: 803,
        scrollLeft: 0,
      },
    });

    expect(isPartiallyInViewport).toEqual(true);
  });
});
