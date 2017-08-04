# yubaba-core [![NPM version](http://img.shields.io/npm/v/yubaba-core.svg?style=flat-square)](https://www.npmjs.com/package/yubaba-core) [![NPM downloads](http://img.shields.io/npm/dm/yubaba-core.svg?style=flat-square)](https://www.npmjs.com/package/yubaba-core)

```sh
npm install yubaba-core
```

## Requirements

Under the hood yubaba uses the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). Make sure you [have a polyfill](https://github.com/web-animations/web-animations-js) if targetting browsers that don't support it.

## Animation Orchestration

Defined animations are calculated in blocks of arrays. For example, for the given animation definition:

```javascript
const animation = [
  {
    animationName: 'circle-shrink',
    duration: 400,
    background: '#fff',
    fadeout: 500,
  },
  {
    animationName: 'move',
    duration: 400,
  },
];
```

This will circle expand from the source element, and when the animation is complete will move the element from the source to the destination.

But what if we wanted both to happen at the same time? Well given the next animation definition:

```javascript
const animation = [
  [
    {
      animationName: 'circle-shrink',
      duration: 400,
      background: '#fff',
      fadeout: 500,
    },
    {
      animationName: 'move',
      duration: 400,
    },
  ],
];
```

We've moved the animations inside another array. This will make both animations happen at the same time. You can mix and match as well! We can have animations happen at the same time, and then after they finish fire off other animations, like so:

```javascript
const animation = [
  [
    {
      animationName: 'circle-shrink',
      duration: 400,
      background: '#fff',
      fadeout: 500,
    },
    {
      animationName: 'move',
      duration: 400,
    },
  ],
  {
    animationName: 'circle-expand',
    duration: 100,
    background: '#000',
  },
];
```

### Common Props

| prop | type | required | description |
|-|-|-|-|
| animationName | `string` | yes | The animation name. See below for the animation definitions. The name should be in `kebab-case`. |
| animation | `Function` | no | The custom animation. This takes priority over `animationName`. [See `packages/core/src/animations/index.js` for the explict type definition.](https://github.com/madou/yubaba/blob/master/packages/core/src/animations/index.js#L16) |
| duration | `number` | yes | In ms, the duration of the animation. |
| fadeout | `number` | no | Fadeout the animation at the end of the animation. In ms. |
| delay | `number` | no | Delays the animation in ms. |
| onStart | `Function` | no | Callback that is triggered when the animation is started. |

For the specific props for each animation look below in Animation Definitions.

## Animation Definitions

### `move`

#### Extra Options

| prop | type | required | description |
|-|-|-|-|
| zIndex | `number` | no | zIndex override |

#### Usage

```javascript
import { move } from 'yubaba-core';

const animate = move(document.getElementById('start-element'), {
  zIndex: 2,
});

animate(document.getElementById('end-element')).then();
```

### `circleExpand`

#### Extra Options

| prop | type | required | description |
|-|-|-|-|
| background | `string` | yes | Background style for the animation container. |
| cover | `boolean` | no | Should the animation container cover the entire viewport. Defaults to true. |
| zIndex | `number` | no | zIndex override |

#### Usage

```javascript
import { circleExpand } from 'yubaba-core';

const animate = circleExpand(document.getElementById('start-element'), {
  background: 'blue',
});

// Note no end element needed
animate().then();
```

### `circleShrink`

#### Extra Options

| prop | type | required | description |
|-|-|-|-|
| background | `string` | yes | Background style for the animation container. |
| cover | `boolean` | no | Should the animation container cover the entire viewport. Defaults to true. |
| zIndex | `number` | no | zIndex override |

#### Usage

```javascript
import { circleShrink } from 'yubaba-core';

const animate = circleShrink(document.getElementById('start-element'), {
  background: 'blue',
});

// Note no end element needed
animate().then();
```

### `swipe`

#### Extra Options

| prop | type | required | description |
|-|-|-|-|
| background | `string` | yes | Background style for the animation container. |
| cover | `boolean` | no | Should the animation container cover the entire viewport. Defaults to true. |
| zIndex | `number` | no | zIndex override |

#### Usage

```javascript
import { swipe } from 'yubaba-core';

const animate = swipe(document.getElementById('start-element'), {
  background: 'blue',
});

// Note no end element needed
animate().then();
```

### `fadeout`

#### Usage

```javascript
import { fadeout } from 'yubaba-core';

const animate = fadeout(document.getElementById('start-element'))();

// Note no end element needed
animate().then();
```
