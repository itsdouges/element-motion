# yubaba 🧙✨

/juːbaːba/ out of the box animated experiences for [React.js](https://reactjs.org/) 🧙✨

[![npm](https://img.shields.io/npm/v/yubaba.svg)](https://www.npmjs.com/package/yubaba) [![npm bundle size (minified + gzip)](https://badgen.net/bundlephobia/minzip/yubaba)](https://bundlephobia.com/result?p=yubaba)

<a href="https://yubabajs.com/getting-started#moving-from-a-persisted-element"><img src="https://user-images.githubusercontent.com/6801309/57364146-eff7c800-71c5-11e9-9ddd-98ec510a6002.gif" height="500" alt="Moving from a persisted element" /></a>
<a href="https://yubabajs.com/getting-started#moving-to-another-distinct-element"><img src="https://user-images.githubusercontent.com/6801309/57364968-88db1300-71c7-11e9-8a51-b45b45eb64ab.gif" height="500" alt="Moving to another distinct element" /></a>
<a href="https://yubabajs.com/advanced-usage#moving-using-a-focal-target"><img src="https://user-images.githubusercontent.com/6801309/57364297-3cdb9e80-71c6-11e9-9a5f-e69ad9a7184b.gif" height="500" alt="Moving using a focal target" /></a>

## What is yubaba???

It's all about ✨**animation over state transitions** ✨it can help with:

- 📴 Enabling animations to be possible between disconnected leaf nodes in the React tree
- 🚚 [Moving an element](https://yubabajs.com/move) from one location to another
- 💨 [Revealing elements](https://yubabajs.com/focal-reveal-move) inside another element
- 👓 [Supporting animations](https://yubabajs.com/supporting-animations) by obstructing elements in view
- 🤫 [Hiding children elements](https://yubabajs.com/advanced-usage#delay-showing-content-until-all-animations-have-finished) until animations have completed to trick users
- 🔢 [Orchestrating](https://yubabajs.com/advanced-usage#wait-for-the-previous-animation-to-finish-before-starting-the-next) when animations should start and [in what order](https://yubabajs.com/advanced-usage#controlling-in-what-order-animations-should-execute)
- 📝 Composing animations together to create composite animations, for example [CrossFadeMove](https://yubabajs.com/cross-fade-move)
- 🤯 [Anything you can imagine](https://yubabajs.com/custom-animations), seriously

## Installation

`yubaba` has a peer dependency on [emotion](https://emotion.sh/docs/introduction) for some of the more advanced animations.

```bash
npm install yubaba react@^16.4.x react-dom@^16.4.x emotion@^10.x.x --save
```

or

```bash
yarn add yubaba react@^16.4.x react-dom@^16.4.x emotion@^10.x.x
```

> **Tip -** Both es and commonjs modules are provided in the package.
> Make sure to consume the es modules for their tree shaking ability!

## Usage

```js
import Animator, { Move } from 'yubaba';

({ isLarge }) => (
  <Animator name="my-first-baba" triggerSelfKey={isLarge}>
    <Move>{anim => <div {...anim} className={isLarge ? 'large' : 'small'} />}</Move>
  </Animator>
);
```

## Next steps

- **First time** here? After installing head over to [Getting started](https://yubabajs.com/getting-started) to start learning the basics
- Interested in **animating an element**? Check out [Focal animations](https://yubabajs.com/focal-animations)
- For **ready made experiences** check out [Composite components](https://yubabajs.com/composite-components), just grab them and go!
- Having **trouble**? Maybe [Troubleshooting](https://yubabajs.com/troubleshooting) has your answers
