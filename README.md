# yubaba

is an element to element animation orchestrator for React.js ✨

[![npm](https://img.shields.io/npm/v/yubaba.svg)](https://www.npmjs.com/package/yubaba)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/yubaba.svg)](https://bundlephobia.com/result?p=yubaba)
[![Build Status](https://travis-ci.org/madou/yubaba.svg?branch=master)](https://travis-ci.org/madou/yubaba)
[![Dev Dependencies](https://david-dm.org/madou/yubaba/dev-status.svg)](https://david-dm.org/madou/yubaba?type=dev)

[![Example animation using yubaba](https://github.com/madou/yubaba/raw/master/test/images/intro.gif)](https://madou.github.io/yubaba/?selectedKind=yubaba-examples%2FParentChild%2FEmailThreads&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)

## Installation

```bash
npm install yubaba --save
```

or

```bash
yarn add yubaba
```

## Motivation

Complex page transitions are becoming more common on the web but we're still at a point where we need to write a lot of boilerplate to make it happen,
worse yet disjointed parts of our apps needing to know about each other to make it all work.

Yubaba tries to solve this by allowing disjointed parts of your app define what animations they want to happen when a matching partner is found,
without explicit knowledge of each other.

See usage and examples for a deeper look at this.

## Examples

- [All examples](https://madou.github.io/yubaba)

### Parent to child

A list of elements (the parent) transitioning to show more information (the child).

- [Email Threads](https://madou.github.io/yubaba/?selectedKind=yubaba-examples%2FParentChild%2FEmailThreads&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel) ([code](https://github.com/madou/yubaba/blob/master/packages/yubaba-examples/src/parentChild/emailThreads/stories.tsx))
- [Image Search](https://madou.github.io/yubaba/?selectedKind=yubaba-examples%2FParentChild%2FImageSearch&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel) ([code](https://github.com/madou/yubaba/blob/master/packages/yubaba-examples/src/parentChild/imageSearch/stories.tsx))
- [Music Player](https://madou.github.io/yubaba/?selectedKind=yubaba-examples%2FParentChild%2FMusicPlayer&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel) ([code](https://github.com/madou/yubaba/blob/master/packages/yubaba-examples/src/parentChild/musicPlayer/stories.tsx))

### Transformation

Elements transforming into another.

- [Search Bar](https://madou.github.io/yubaba/?selectedKind=yubaba-examples%2FTransformation%2FSearchBar&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel) ([code](https://github.com/madou/yubaba/blob/master/packages/yubaba-examples/src/transformation/searchBar/stories.tsx))

### Core

A range of different scenarios for each animation component. [Looking for component API docs](#components)?

#### Focal

Transitioning the same element from one place to another.

- [Move](https://madou.github.io/yubaba/?selectedKind=yubaba%2FFLIPMove&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)
- [CrossFadeMove](https://madou.github.io/yubaba/?selectedKind=yubaba%2FCrossFadeMove&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)
- [ConcealMove](https://madou.github.io/yubaba/?selectedKind=yubaba%2FConcealMove&selectedStory=TargetHeight&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)
- [RevealMove](https://madou.github.io/yubaba/?selectedKind=yubaba%2FRevealMove&selectedStory=TargetHeight&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)

#### Supporting

_Helping_ the focal animation look the best it can be.

- [BabaManager](https://madou.github.io/yubaba/?selectedKind=yubaba%2FBabaManager&selectedStory=NoManager&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)
- [CircleExpand](https://madou.github.io/yubaba/?selectedKind=yubaba%2FCircleExpand&selectedStory=FromStaticPosition&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)
- [CircleShrink](https://madou.github.io/yubaba/?selectedKind=yubaba%2FCircleShrink&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)
- [Swipe](https://madou.github.io/yubaba/?selectedKind=yubaba%2FSwipe&selectedStory=Up&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel)

### Usage build ups

We'll build up each step to leave you with an _awesome_ transition.
Click each gif to see its codesandbox.

We have two disjointed components that are toggled when clicked (click on Finn!).
How can we transition them to each other?

[![Intro to Yubaba 0/4](https://github.com/madou/yubaba/blob/master/test/images/finn-0.gif?raw=true)](https://codesandbox.io/s/jvw344oll3)

#### Introducing `<Baba />` and `<CrossFadeMove />`

Let's use the [Baba](#baba) and [CrossFadeMove](#crossfademove) components to have them seamlessly transition to the destination.
[Baba](#Baba) is the brains - it does all of the orchestration.
[CrossFadeMove](#crossfademove) is one of many focal animations available - it will cross fade both elements from the starting point to the destination point.

[![Intro to Yubaba 1/4](https://github.com/madou/yubaba/blob/master/test/images/finn-1.gif?raw=true)](https://codesandbox.io/s/x3v5ywk5ro)

Okay so that looks cool,
but Finn's sword is shown immediately!
Is there anything we can do to make it show after all animations have finished?

#### Introducing `<BabaManager />`

Let's bring in a component [BabaManager](#babamanager) which will be used to delay showing Finn's sword.
You can imagine this as content in a page around the destination element that should be shown _after_ all animations have finished.

[![Intro to Yubaba 2/4](https://github.com/madou/yubaba/blob/master/test/images/finn-2.gif?raw=true)](https://codesandbox.io/s/oo6905z0k9)

Cool,
now we're making progress.
We can do better though,
what if Finn could really sell his preparation that he's about to attack?

#### Introducing `<CircleExpand />`

Let's bring in a component [CircleExpand](#circleexpand) which will expand to fit the viewport,
for Finn it will give him some _oomph_ to really sell the attack.

[![Intro to Yubaba 3/4](https://github.com/madou/yubaba/blob/master/test/images/finn-3.gif?raw=true)](https://codesandbox.io/s/6xp1jk4xjw)

Really cool!
But both the [CircleExpand](#circleexpand) and [CrossFadeMove](#crossfademove) happening at the same time looks kind of weird,
what if we could delay [CrossFadeMove](#crossfademove) until after [CircleExpand](#circleexpand) had finished animating?

#### Introducing `<Wait />`

Let's bring in a component [Wait](#wait) which will delay the next animation from happening until after the previous one has finished!

[![Intro to Yubaba 4/4](https://github.com/madou/yubaba/blob/master/test/images/finn-4.gif?raw=true)](https://codesandbox.io/s/llv7pkv9y9)

And there you have it,
a masta-peece!

## Create your own animations

Yubaba comes with the ability for you to make your own animations using the same plumbing the official animations are constructed from.
Look in [src/animations](https://github.com/madou/yubaba/tree/master/packages/yubaba/src/animations) for example implementations.

Tutorial(s) coming soon.

## Components

### Utility

These components exist to pass data around and orchestrate the animations.

#### Baba

[Docs](https://madou.github.io/yubaba/typedoc/classes/baba.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/babaprops.html)

This is the primary component in yubaba.
When rendering it will be given all of the animation data from its children.
When unmounting or flipping the "in" prop from `true` to `false`,
it will execute all the animations `top to bottom` if a matching [Baba](#baba) pair is found within `50ms`.

```jsx
import Baba from 'yubaba';

<Baba name="baba">
  {({ ref, style, className }) => <div ref={ref} style={style} className={className} />}
</Baba>;
```

#### Target

[Docs](https://madou.github.io/yubaba/typedoc/classes/target.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/targetprops.html)

Used to explicitly mark the focal element,
only a handful of animations require this component to be used,
for example [Reveal](#reveal)`.

```jsx
import Baba, { Target } from 'yubaba';

<Baba name="target">
  <Target>{({ ref }) => <div ref={ref} />}</Target>
</Baba>;
```

#### Collector

[Docs](https://madou.github.io/yubaba/typedoc/classes/collector.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/collectorprops.html)

Used as the glue for all animation components,
every animation component will use this internally to pass the data to the parent [Baba](#baba).

```jsx
import { Collector } from 'yubaba';

<Collector
  data={{
    action: 'animation',
    payload: {
      beforeAnimate: this.beforeAnimate,
      animate: this.animate,
      afterAnimate: this.afterAnimate,
    },
  }}
>
  {children}
</Collector>;
```

### Focal

Transitioning visually similar elements from one place to another.

#### Move ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FFLIPMove&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/flipmove.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/flipmoveprops.html)

Will transition the destination element **from** the origin element position.

```jsx
// origin-element.js
import Baba, { FLIPMove as Move } from 'yubaba';

<Baba name="move">
  <Move>{baba => <div {...baba} />}</Move>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="move">{baba => <div {...baba} />}</Baba>;
```

#### FadeMove

[Docs](https://madou.github.io/yubaba/typedoc/classes/fademove.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/fademoveprops.html)

Will `position: absolute` move the origin element to the destination element while fading out.

```jsx
// origin-element.js
import Baba, { FadeMove } from 'yubaba';

<Baba name="fade-move">
  <FadeMove>{baba => <div {...baba} />}</FadeMove>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="fade-move">{baba => <div {...baba} />}</Baba>;
```

#### CrossFadeMove ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FCrossFadeMove&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/crossfademove.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/crossfademoveprops.html)

Composes the [Move](#move) and [FadeMove](#fademove) animations for a cross-fade move.

```jsx
// origin-element.js
import Baba, { CrossFadeMove } from 'yubaba';

<Baba name="cross-fade">
  <CrossFadeMove>{baba => <div {...baba} />}</CrossFadeMove>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="cross-fade">{baba => <div {...baba} />}</Baba>;
```

#### Reveal

[Docs](https://madou.github.io/yubaba/typedoc/classes/reveal.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/revealprops.html)

Reveals the destination element container from the [Target](#target) component.
A limitation at the moment is the destination element _must_ have an animation defined,
if you don't want one to happen use the [Noop](#noop) animation.
Requires the use of the [Target](#target) component to specify the focal element.

```jsx
// origin-element.js
import Baba, { Reveal, Target } from 'yubaba';

<Baba name="reveal">
  <Reveal>{baba => <div {...baba} />}</Reveal>
</Baba>;

// destination-element.js
import Baba, { Target, Noop } from 'yubaba';

<Baba name="reveal">
  <Noop>
    {baba => (
      <div {...baba}>
        <Target>{target => <div {...target} />}</Target>
      </div>
    )}
  </Noop>
</Baba>;
```

#### RevealMove ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FRevealMove&selectedStory=TargetHeight&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/revealmove.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/revealmoveprops.html)

Useful for transitioning from a parent to a child,
will expand from the focal element to the container.
Requires the use of the [Target](#target) component to specify the focal element.

```jsx
// origin-element.js
import Baba, { RevealMove } from 'yubaba';

<Baba name="reveal-move">
  <RevealMove>{baba => <div {...baba} />}</RevealMove>
</Baba>;

// destination-element.js
import Baba, { Target, Noop } from 'yubaba';

<Baba name="reveal-move">
  <Noop>
    {baba => (
      <div {...baba}>
        <Target>{target => <div {...target} />}</Target>
      </div>
    )}
  </Noop>
</Baba>;
```

#### ConcealMove ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FConcealMove&selectedStory=TargetHeight&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/concealmove.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/concealmoveprops.html)

Useful for transitioning from a child to a parent,
will shrink from the container to the focal element.
Requires the use of the [Target](#target) component to specify the focal element.

```jsx
// origin-element.js
import Baba, { Target, ConcealMove } from 'yubaba';

<Baba name="conceal-move">
  <ConcealMove>
    {baba => (
      <div {...baba}>
        <Target>{target => <div {...target} />}</Target>
      </div>
    )}
  </ConcealMove>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="conceal-move">{baba => <div {...baba} />}</Baba>;
```

#### Noop

[Docs](https://madou.github.io/yubaba/typedoc/classes/noop.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/noopprops.html)

A no-operation "noop" animation.

```jsx
// origin-element.js
import Baba, { Noop } from 'yubaba';

<Baba name="noop">
  <Noop>{baba => <div {...baba} />}</Noop>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="noop">{baba => <div {...baba} />}</Baba>;
```

### Supporting

_Helping_ the focal animation look the best it can be when transitioning.

#### BabaManager ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FBabaManager&selectedStory=WithManager&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/babamanager.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/babamanagerprops.html)

Used to hide contents before an animation is complete triggered from a child <Baba /> component.
If there is more than one child <Baba /> you can use an optional name prop which should match the appropriate <Baba /> component.

If it is the initial mount it will immediately be shown.

```jsx
// origin-element.js
import Baba, { Move } from 'yubaba';

<Baba name="expand">
  <Move>{baba => <div {...baba} />}</Move>
</Baba>;

// destination-element.js
import Baba, { BabaManager } from 'yubaba';

<BabaManager>{({ style }) => <div style={style}>{<Baba>{/* ... */}</Baba>}</div>}</BabaManager>;
```

#### Wait

[Docs](https://madou.github.io/yubaba/typedoc/classes/wait.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/waitprops.html)

Is used to pause the execution of all child animations until all parent children animations have completed.

E.g: [CircleExpand](#circleexpand) will wait until [Move](#move) has finished before starting.

```jsx
// origin-element.js
import Baba, { Wait, Move, CircleExpand } from 'yubaba';

<Baba name="wait">
  <Move>
    <Wait>
      <CircleExpand>{baba => <div {...baba} />}</CircleExpand>
    </Wait>
  </Move>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="wait">{baba => <div {...baba} />}</Baba>;
```

#### CircleExpand ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FCircleExpand&selectedStory=FromStaticPosition&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/circleexpand.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/circleexpandprops.html)

Will animate a circle from the origin element to cover the entire viewport,
and then fade out.

Generally you should use [CircleExpand](#circleexpand) and [CricleShrink](#circleshrink) together to seamlessly transition the background between pages.

```jsx
// origin-element.js
import Baba, { CircleExpand } from 'yubaba';

<Baba name="expand">
  <CircleExpand>{baba => <div {...baba} />}</CircleExpand>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="expand">{baba => <div {...baba} />}</Baba>;
```

#### CircleShrink ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FCircleShrink&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/circleshrink.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/circleshrinkprops.html)

Will animate a circle from the viewport to destination element,
and then fade out.

Generally you should use [CircleExpand](#circleexpand) and [CricleShrink](#circleshrink) together to seamlessly transition the background between pages.

```jsx
// origin-element.js
import Baba, { CircleShrink } from 'yubaba';

<Baba name="shrink">
  <CircleShrink>{baba => <div {...baba} />}</CircleShrink>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="shrink">{baba => <div {...baba} />}</Baba>;
```

#### Swipe ([example](https://madou.github.io/yubaba/?selectedKind=yubaba%2FSwipe&selectedStory=Up&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybook%2Fnotes%2Fpanel))

[Docs](https://madou.github.io/yubaba/typedoc/classes/swipe.html) | [Props](https://madou.github.io/yubaba/typedoc/interfaces/swipeprops.html)

Will animate a square swiping over the viewport.

```jsx
// origin-element.js
import Baba, { Swipe } from 'yubaba';

<Baba name="swipe">
  <Swipe>{baba => <div {...baba} />}</Swipe>
</Baba>;

// destination-element.js
import Baba from 'yubaba';

<Baba name="swipe">{baba => <div {...baba} />}</Baba>;
```

## API Reference

[See typedoc.](https://madou.github.io/yubaba/typedoc/)
