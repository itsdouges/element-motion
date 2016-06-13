import { calculateElementSize, calculateElementLocation } from './';

describe('dom', () => {
  it('should return height and size of dom element', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '100px';

    document.body.appendChild(element);

    const size = calculateElementSize(element);

    size.should.eql({
      height: 100,
      width: 100,
    });

    document.body.removeChild(element);
  });

  it('should return x,y location of element', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.marginLeft = '100px';
    element.style.marginTop = '200px';

    document.body.appendChild(element);

    const size = calculateElementLocation(element);

    size.should.eql({
      x: 108,
      y: 200,
    });

    document.body.removeChild(element);
  });
});
