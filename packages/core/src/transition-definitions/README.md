# transitions

Example output

```
{
 from: {},
 to: {} or () => {},
 finally: {},
}
```

## from

Has properties `width`, `height`, `top`, `left`, `scale`.

## to

Is either an object or a callback function.

### object

Has properties `width`, `height`, `top`, `left`, `scale`.

### function

Takes in a DOMElement, returns an object with properties `width`, `height`, `top`, `left`.

## finally

Has properties `scale`, `opacity`.