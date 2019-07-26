# Element Motion

Tween between view states with declarative zero configuration element motions for [React](https://reactjs.org/).

[![npm](https://img.shields.io/npm/v/@element-motion/core.svg)](https://www.npmjs.com/package/@element-motion/core) [![npm bundle size (minified + gzip)](https://badgen.net/bundlephobia/minzip/@element-motion/core)](https://bundlephobia.com/result?p=@element-motion/core)

<a href="https://elementmotion.com/getting-started#moving-from-a-persisted-element"><img src="https://user-images.githubusercontent.com/6801309/57364146-eff7c800-71c5-11e9-9ddd-98ec510a6002.gif" height="500" alt="Moving from a persisted element" /></a>
<a href="https://elementmotion.com/getting-started#moving-to-another-distinct-element"><img src="https://user-images.githubusercontent.com/6801309/57364968-88db1300-71c7-11e9-8a51-b45b45eb64ab.gif" height="500" alt="Moving to another distinct element" /></a>
<a href="https://elementmotion.com/advanced-usage#moving-using-a-focal-target"><img src="https://user-images.githubusercontent.com/6801309/57364297-3cdb9e80-71c6-11e9-9a5f-e69ad9a7184b.gif" height="500" alt="Moving using a focal target" /></a>

Dynamic motions as easy as:

```js
<Motion triggerSelfKey={isLarge}>
  <Scale>{motion => <div {...motion} className={isLarge ? 'large' : 'small'} />}</Scale>
</Motion>
```

## Get started

Check out our [example motions](https://elementmotion.com) and then once you're done have a [look at the docs](https://elementmotion.com/getting-started).

### Installation

Element Motion requires React 16.4 or greater.

```bash
npm install @element-motion/core --save
```

or

```bash
yarn add @element-motion/core
```

### Whats in a motion?

There are two halves to Element Motion:

- [**Orchestration**](https://elementmotion.com/motion) (collecting DOM data, enabling motion between disconnected React elements, executing motions)
- [**Motions**](https://elementmotion.com/custom-motions) (animation concerns, CSS transitions/animations, JS animations, whatever you can imagine)

### Next steps

- **First time** here? After installing head over to [Getting started](https://elementmotion.com/getting-started) to start learning the basics
- Interested in **elements in motion**? Check out [Focal motions](https://elementmotion.com/focal-motions)
- For **ready made experiences** check out [Composite experiences](https://elementmotion.com/composite-experiences), just grab them and go!
- Having **trouble**? Maybe [Troubleshooting](https://elementmotion.com/troubleshooting) has your answers

## Talks

<a href="https://www.icloud.com/keynote/0ryFt4ce-WLXBwwOttgI9SbMA#element-motion-react-sydney"><img width="250" height="140" alt="Element Motion @ React Sydney 3rd June 2019 Slides" src="https://user-images.githubusercontent.com/6801309/58944241-bade9580-87c4-11e9-99f1-435943e7fa14.png"></a>
<br /><a href="https://www.meetup.com/React-Sydney/events/261817672/"><strong>React Sydney</strong> - 3rd June 2019</a>
