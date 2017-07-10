import * as module from './';

describe('core root', () => {
  it('should pass', () => {
    expect(module).to.have.keys('expand', 'fadeout', 'move', 'reveal');
  });
});
