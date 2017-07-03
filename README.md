<p align="center">
  <br />
  <img src="https://github.com/madou/yubaba/blob/master/icon.png?raw=true" style="margin:0 auto" />
</p>

<h1 align="center">
  yubaba

  <a href="https://travis-ci.org/madou/yubaba"><img alt="Build Status" src="https://travis-ci.org/madou/yubaba.svg?branch=master"></a>
</h1>

## Troubleshooting

### Scroll anchoring

Make sure to disable scroll anchoring on the body tag with `overflow-anchor: none;`, else your transitions will be jumping all over the place.

### Images and variable height elements

If you have variable height elements that can change height while the transition is progressing the end position will look be out of place. Ensure your page has a reasonable amount of fixed elements where needed to keep the illusion. [There is an issue to make this better in a later version.](https://github.com/madou/yubaba/issues/14)
