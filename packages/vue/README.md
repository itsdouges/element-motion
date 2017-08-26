# vue-yubaba [![NPM version](http://img.shields.io/npm/v/vue-yubaba.svg?style=flat-square)](https://www.npmjs.com/package/vue-yubaba) [![NPM downloads](http://img.shields.io/npm/dm/vue-yubaba.svg?style=flat-square)](https://www.npmjs.com/package/vue-yubaba)

```sh
npm install vue-yubaba
```

## Requirements

Under the hood yubaba uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). Make sure you [have a polyfill](https://github.com/web-animations/web-animations-js) if targetting browsers that don't support it.

## Usage

### `<vue-animate>`

This is the primary component used. A `<vue-animate />` should be created in pairs, one for the source, one for the destination, using the `pair` prop.

```javascript
// todo
```

#### Props

| prop | type | required | description |
|-|-|-|-|
| pair | `string` | yes | Animation pair name. Both the source and destination `<Animate />` should have the same pair name. |
| animations | `Array<Animation \| Array<Animation>>`  | yes | Array of animations to apply to the component, see below for more details. |
| children | `Children`  | no | n/a |

All other props are passed through to the root element.

#### [Animation Orchestration: See the core README](https://github.com/madou/yubaba/blob/master/packages/core/README.md#animation-orchestration)
