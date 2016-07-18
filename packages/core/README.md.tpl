# <% libraryName %>

## Installation

### With npm

```
$ npm install <% libraryName %> --save
```

## Usage

#### Method signature

```
import { method } from '<% libraryName %>';
const transition = method(DOMElement, options);

// transition.promise
// transition.start
```

### Generic options

- autoStart (bool)
- autoCleanup (bool)
- duration (number)
- delay (number)
- onStart (func)

#### Transition object

- promise (Promise)
- start (func, returns Promise)

// TODO: Add definition READMEs here.
