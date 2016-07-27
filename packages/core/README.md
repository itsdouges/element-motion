# material-transitions-core

## Installation

### With npm

```
$ npm install material-transitions-core
```

## Usage

#### Method signature

```
import { method } from 'material-transitions-core';
const transition = method(DOMElement, options);

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
