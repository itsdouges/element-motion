import * as module from './';

describe('core root', () => {
  it('should pass', () => {
    expect(module).to.have.keys('circleExpand', 'circleShrink', 'fadeout', 'move', 'reveal', 'custom');
  });
});
