import injectStart from 'inject!./';

describe('cool', () => {
  let module;
  let mockFinish;

  beforeEach(() => {
    mockFinish = {};

    module = injectStart({
      'finish': mockFinish,
    });
  });

  it.only('should return finish callback', () => {
    mockFinish.finish = () => {};

    const actual = module.start();

    actual.should.equal(mockFinish.finish);
  });
});
