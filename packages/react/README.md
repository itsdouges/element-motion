# react-yubaba [![NPM version](http://img.shields.io/npm/v/react-yubaba.svg?style=flat-square)](https://www.npmjs.com/package/react-yubaba) [![NPM downloads](http://img.shields.io/npm/dm/react-yubaba.svg?style=flat-square)](https://www.npmjs.com/package/react-yubaba)

```sh
npm install react-yubaba
```

## Usage

### `<Animate />`

This is the primary component used. An `<Animate />` should be created in pairs, one for the source, one for the destination, using the `pair` prop.

```javascript
import Animate from 'react-yubaba';

const AnimatedBlock = () => (
  <Animate
    pair="page-to-sweet"
    animations={[{
      animationName: 'move',
      duration: 0.5,
    }]}
  >
    <div>This is a block</div>
  </Animate>
);
```

#### Props

| prop | type | required | description |
|-|-|-|-|
| pair | `string` | yes | Animation pair name. Both the source and destination `<Animate />` should have the same pair name. |
| animations | `Array<Animation \| Array<Animation>>`  | yes | Array of animations to apply to the component, see below for more details. |
| children | `Children`  | no | n/a |

All other props are passed through to the root element.

#### [Animation Orchestration: See the core README](https://github.com/madou/yubaba/blob/master/packages/core/README.md#Animation%20Orchestration)

### `withAnimation(animations: Array<Animation | Array<Animation>>)(ReactClass<*>) => ReactClass<*>`

If you find you don't need to define the transitions during the react lifecycle you can use this decorator to define them.

```javascript
import { withAnimation } from 'react-yubaba';

const Block = () => <div>Text Block</div>;

const AnimatedBlock = withAnimation([{
  animationName: 'move',
  duration: 0.5,
}])(Block);

const Page = () => <AnimatedBlock animationPair="page-to-sweet" />;
```

#### Props

| prop | type | required | description |
|-|-|-|-|
| animationPair | `string` | yes | Animation pair name. Both the source and destination `<Animate />` should have the same pair name. |

### `<AnimateContainer />`

Useful if you have content you want to keep hidden until an animation pair has finished.
The children are shown in two cases:

1) When the container mounts and then the animation pair finishes
1) When the container mounts and there is no animation prepared yet

```javascript
import { AnimateContainer } from 'react-yubaba';

const Page = () => (
  <AnimateContainer pair="my-animation-pair">
    <Animate
      pair="my-animation-pair"
      transitions={[{
        transition: 'move',
        duration: 0.5,
      }]}
    >
      <div>My block of text</div>
    </Animate>

    <p>
      My block of content
    </p>
  </AnimateContainer>
);
```

#### Props

| prop | type | required | description |
|-|-|-|-|
| pair | `string` | yes | Animation pair name. Both the source and destination `<Animate />` should have the same pair name. |
| children | `Children`  | no | n/a |

All other props are passed through to the root element.
