<h1>
  <img aria-label="element motion" src="https://user-images.githubusercontent.com/6801309/58364853-bf21cd80-7efd-11e9-8300-df952b3a03c8.png" height="100" />
</h1>

formerly `yubaba` - element motion for [React.js](https://reactjs.org/) 💨✨

[![npm](https://img.shields.io/npm/v/@element-motion/core.svg)](https://www.npmjs.com/package/@element-motion/core) [![npm bundle size (minified + gzip)](https://badgen.net/bundlephobia/minzip/@element-motion/core)](https://bundlephobia.com/result?p=@element-motion/core)

<a href="https://elementmotion.com/getting-started#moving-from-a-persisted-element"><img src="https://user-images.githubusercontent.com/6801309/57364146-eff7c800-71c5-11e9-9ddd-98ec510a6002.gif" height="500" alt="Moving from a persisted element" /></a>
<a href="https://elementmotion.com/getting-started#moving-to-another-distinct-element"><img src="https://user-images.githubusercontent.com/6801309/57364968-88db1300-71c7-11e9-8a51-b45b45eb64ab.gif" height="500" alt="Moving to another distinct element" /></a>
<a href="https://elementmotion.com/advanced-usage#moving-using-a-focal-target"><img src="https://user-images.githubusercontent.com/6801309/57364297-3cdb9e80-71c6-11e9-9a5f-e69ad9a7184b.gif" height="500" alt="Moving using a focal target" /></a>

## Why element motion?

It's all about ✨**motion over state transitions** ✨it can help with:

- 📴 Enabling animations to be possible between disconnected elements in the React tree
- 🚚 [Moving an element](https://elementmotion.com/move) from one location to another
- 💨 [Revealing elements](https://elementmotion.com/focal-reveal-move) inside another element
- 👓 [Supporting animations](https://elementmotion.com/supporting-animations) by obstructing elements in view
- 🤫 [Hiding children elements](https://elementmotion.com/advanced-usage#delay-showing-content-until-all-animations-have-finished) until animations have completed to trick users
- 🔢 [Orchestrating](https://elementmotion.com/advanced-usage#wait-for-the-previous-animation-to-finish-before-starting-the-next) when animations should start and [in what order](https://elementmotion.com/advanced-usage#controlling-in-what-order-animations-should-execute)
- 📝 Composing animations together to create composite animations, for example [CrossFadeMove](https://elementmotion.com/cross-fade-move)
- 🤯 [Anything you can imagine](https://elementmotion.com/custom-animations), seriously

## Installation

```bash
npm install @element-motion/core react react-dom emotion --save
```

or

```bash
yarn add @element-motion/core react react-dom emotion
```

React should be greater or equal to `v16.4`, emotion should be greater or equal to `v9`.

> **Tip -** Both es and commonjs modules are provided in the package.
> Make sure to consume the es modules in production for their tree shaking ability!

## Usage

```js
import Animator, { Move } from '@element-motion/core';

({ isLarge }) => (
  <Animator triggerSelfKey={isLarge}>
    <Move>{anim => <div {...anim} className={isLarge ? 'large' : 'small'} />}</Move>
  </Animator>
);
```

## Next steps

- **First time** here? After installing head over to [Getting started](https://elementmotion.com/getting-started) to start learning the basics
- Interested in **animating an element**? Check out [Focal animations](https://elementmotion.com/focal-animations)
- For **ready made experiences** check out [Composite components](https://elementmotion.com/composite-components), just grab them and go!
- Having **trouble**? Maybe [Troubleshooting](https://elementmotion.com/troubleshooting) has your answers
