# yubaba-core

```sh
npm install yubaba-core
```

## Usage

#### Method signature

```javascript
import { func } from 'yubaba-core';
const transition = func(DOMElement, options);

transition.promise.then();
transition.start();
```

### General options

- autoStart (bool)
- autoCleanup (bool)
- duration (number)
- delay (number)
- onStart (func)

#### Transition object

- promise (Promise)
- start (func, returns Promise)

### Move

#### Options

- matchSize (bool)

#### Usage

```javascript
import { move } from 'yubaba-core';

const transition = move(document.getElementById('start-element'), {
  matchSize: true,
});

transition.start(document.getElementById('end-element'));
```

### Expand

#### Options

- background (string)
- reverse (bool)
- cover (bool)

#### Usage

```javascript
import { expand } from 'yubaba-core';

expand(document.getElementById('start-element'), {
  autoStart: true,
  background: 'blue',
});
```

### Reveal

#### Options

- showFromElement (DOMElement)
- reverse (bool)

#### Usage

```html
<div id="start-container">
  <div id="start-icon"></div>
</div>
```

```javascript
import { reveal } from 'material-transitions-core';

const transition = reveal(document.getElementById('start-container'), {
  matchSize: true,
  showFromElement: document.getElementById('start-icon'),
});

transition.start();
```


### Fadeout

#### Options

None.

#### Usage

```javascript
import { fadeout } from 'yubaba-core';

fadeout(document.getElementById('start-element'), {
  autoStart: true,
});
```
