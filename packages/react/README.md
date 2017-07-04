# react-yubaba

```sh
npm install react-yubaba
```

## Usage

### `<Transition />`

This is the base component for `react-yubaba`. `<Transition />` should be created in pairs, one for the source, one for the destination, using the `pair` prop, with an optional `<TransitionContainer />`.

```javascript
import Transition from 'react-yubaba';

const MySweetList = () => (
  <Transition
    pair="page-to-sweet"
    transitions={[{
      transition: 'move',
      duration: 0.5,
    }]}
  >
    <div>sweet transitions</div>
  </Transition>
);
```

#### Props

| prop | type | required | description |
|-|-|-|-|
| pair | `string` | yes | Transition pair name. This should be the same name as your pairing `<Transition />`. |
| transitions | `Array<Transition>`  | yes | Array of transitions to apply to the component, see below for more details. |
| children | `Children`  | no | n/a |

All other props are passed through to the root element.

#### [Transition: See the core README](https://github.com/madou/yubaba/blob/master/packages/core/README.md#Transitions)

### `withTransition(transitions: Array<Transition>)(ReactClass<*>) => ReactClass<*>`

If you find you don't need to define the transitions during the react lifecycle you can use the
`withTransition` decorator to define them up front.

```javascript
import { withTransition } from 'react-yubaba';

const Sweet = () => <div>sweet transitions</div>;
const SweetWithTransition = withTransition([{
  transition: 'move',
  duration: 0.5,
}])(Sweet);

const MySweetList = () => (
  <SweetWithTransition transitionPair="page-to-sweet" />
);
```

#### [Transition: See the core README](https://github.com/madou/yubaba/blob/master/packages/core/README.md#Transitions)

#### Props

| prop | type | required | description |
|-|-|-|-|
| transitionPair | `string` | yes | Transition pair name. This should be the same name as your pairing `<Transition />`. |

### `<TransitionContainer />`

Useful if you have content you want to keep hidden until a transition has completed.
It shows it's children based on two cases:

1) Pairing transition completed (delayed show)
1) Pairing transition is not yet initialised (immediate show)

```javascript
import { TransitionContainer } from 'react-yubaba';

const MySweetPage = () => (
  <TransitionContainer pair="page-to-sweet" className="MySweetPage_root">
    <Transition
      pair="page-to-sweet"
      transitions={[{
        transition: 'move',
        duration: 0.5,
      }]}
    >
      <div>sweet transitions</div>
    </Transition>

    <p>
      How sweet is this! It is like a honey bee.
    </p>
  </TransitionContainer>
);
```

#### Props

| prop | type | required | description |
|-|-|-|-|
| pair | `string` | yes | Transition pair name. This should be the same name as your pairing `<Transition />`. |
| children | `Children`  | no | n/a |

All other props are passed through to the root element.
