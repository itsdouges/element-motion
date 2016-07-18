### Reveal

#### Options

- showFromElement (DOMElement)
- reverse (bool)

#### Usage

```
<div id="start-container">
  <div id="start-icon"></div>
</div>
```

```
import { reveal } from 'material-transitions-core';

const transition = reveal(document.getElementById('start-container'), {
  matchSize: true,
  showFromElement: document.getElementById('start-icon'),
});

transition.start();
```
