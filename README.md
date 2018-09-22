<div align="center">
  <br />
  <img src="https://github.com/madou/yubaba/blob/master/icon.png?raw=true" width="256px" height="256px" align="center" />
</div>

# yubaba

✨ Element to element animation orchestrator for React.js

[![Build Status](https://travis-ci.org/madou/yubaba.svg?branch=master)](https://travis-ci.org/madou/yubaba)
[![npm](https://img.shields.io/npm/v/yubaba.svg)](https://www.npmjs.com/package/yubaba)
[![Dependencies](https://img.shields.io/david/madou/yubaba.svg?style=flat-squarer)](https://david-dm.org/madou/yubaba)
[![Dev Dependencies](https://david-dm.org/madou/yubaba/dev-status.svg)](https://david-dm.org/madou/yubaba?type=dev)

[![Example](https://github.com/madou/yubaba/raw/master/test/images/example-music.gif)](https://madou.github.io/yubaba/?selectedKind=Examples%2FGoogleMusic&selectedStory=move%20expand%20shrink%20wait&full=0&addons=0&stories=1&panelRight=0)

## Installation

```bash
npm install yubaba --save
```

## Motivation

Beautiful page transitions are becoming more common on the web but we're still at apoint where we need to write a lot of boilerplate to make it happen,
and worse yet different parts of our apps needing to know about each other to make it all work.

What if we could keep writing our apps as we do today,
have no leaky abstractions,
and have beautiful transitions easily?
Orchestrating when animations should execute and when content should be displayed is what `yubaba` does best.

## Usage

```javascript
import Baba, { CrossFadeMove, BabaManager } from 'yubaba';

class App extends React.Component {
  state = {
    show: false,
  };

  toggle = () => this.setState(prev => ({ show: !prev.show }));

  render() {
    return (
      <Root>
        {this.state.show || (
          <Baba name="finn-attack">
            <CrossFadeMove>
              {({ ref, style }) => <FinnStart onClick={this.toggle} style={style} innerRef={ref} />}
            </CrossFadeMove>
          </Baba>
        )}

        {this.state.show && (
          <React.Fragment>
            <Baba name="finn-attack">
              <CrossFadeMove>
                {({ ref, style }) => <FinnEnd onClick={this.toggle} style={style} innerRef={ref} />}
              </CrossFadeMove>
            </Baba>

            <Sword />
          </React.Fragment>
        )}
      </Root>
    );
  }
}
```

## Example

These examples will build up from each other to leave you with a _awesome_ transition that was really easy to make.
Click on the gif's to see each steps codesandbox.

So we have two disjointed components that are toggled when clicked (click on Finn!).
How could we have them transition nicely to each other?

[![Intro to Yubaba 0/4](https://github.com/madou/yubaba/blob/master/test/images/finn-0.gif?raw=true)](https://codesandbox.io/s/jvw344oll3)

### Introducing `<Baba />` and `<CrossFadeMove />`

Let's use the `Baba` and `CrossFadeMove` components to have them seamlessly transition to each other.
`Baba` is the brains of `yubaba`,
it does all of the orchestration.
`CrossFadeMove` does just that,
it moves the paired children to each other.

[![Intro to Yubaba 1/4](https://github.com/madou/yubaba/blob/master/test/images/finn-1.gif?raw=true)](https://codesandbox.io/s/x3v5ywk5ro)

Okay so that looks cool,
but Finn's sword is shown immediately!
Is there anything we can do to make it show after all animations have finished?

### Introducing `<BabaManager />`

Let's bring in a component `BabaManager` which will be used to delay showing Finn's sword.
You can imagine this as content in a page around the connecting element (connecting element meaning the element that is transitioning between pages) that should be shown _after_ all animations have finished.

[![Intro to Yubaba 2/4](https://github.com/madou/yubaba/blob/master/test/images/finn-2.gif?raw=true)](https://codesandbox.io/s/oo6905z0k9)

Cool,
now we're making progress.
I think we can do better though,
what if Finn could really sell his preparation that he's about to attack?

### Introducing `<CircleExpand />`

Let's bring in a component `CircleExpand` which will expand to fit the viewport,
for Finn it will give him some _oomph_ to really sell the attack.

[![Intro to Yubaba 3/4](https://github.com/madou/yubaba/blob/master/test/images/finn-3.gif?raw=true)](https://codesandbox.io/s/6xp1jk4xjw)

Really cool!
But both the `CircleExpand` and `CrossFadeMove` happening at the same time looks kind of weird,
what if we could delay `CrossFadeMove` until after `CircleExpand` had finished animating?

### Introducing `<Wait />`

Let's bring in a component `Wait` which will delay the next animation from happening until after the previous one has finished!

[![Intro to Yubaba 4/4](https://github.com/madou/yubaba/blob/master/test/images/finn-4.gif?raw=true)](https://codesandbox.io/s/llv7pkv9y9)

And there you have it,
a masta-peece!

## Other Examples

There are many examples in our [storybook](https://madou.github.io/yubaba/?selectedKind=Examples%2FGoogleSearch&selectedStory=search%20bar&full=0&addons=0&stories=1&panelRight=0),
top picks would include the Google Music and Mobile Google Image Search examples.

## Make your own animations

Tutorial coming soon,
refer to [src/components/animations](https://github.com/madou/yubaba/tree/master/packages/yubaba/src/components/animations) for example implementations for now.

## Components

Click through on the component names to see their api docs and prop definitions.

### [Baba](https://madou.github.io/yubaba/typedoc/classes/baba.html)

This is the primary component in yubaba. When rendering it will be given all of the animation data from its children. When unmounting or flipping the prop in from true to false, it will execute all the animations top to bottom below it if a matching <Baba /> pair is found within 50ms.

### [BabaManager](https://madou.github.io/yubaba/typedoc/classes/babamanager.html)

Used to hide contents before an animation is complete triggered from a child <Baba /> component. If there is more than one child <Baba /> you can use an optional name prop which should match the appropriate <Baba /> component.

If it is the initial mount it will immediately be shown.

### [CircleExpand](https://madou.github.io/yubaba/typedoc/classes/circleexpand.html)

CircleExpand will animate a circle from the entire window to cover end target, and then fade out.

Generally you will use CircleExpand and CircleShrink together to seamlessly transition the background between pages.

### [CircleShrink](https://madou.github.io/yubaba/typedoc/classes/circleshrink.html)

CircleShrink will animate a circle from the entire window to cover end target, and then fade out.

Generally you will use CircleShrink and CircleExpand together to seamlessly transition the background between pages.

### [FLIPMove](https://madou.github.io/yubaba/typedoc/classes/flipmove.html)

FLIPMove will conduct a [FLIP](https://aerotwist.com/blog/flip-your-animations/) styled animation on the target element.

### [CrossFadeMove](https://madou.github.io/yubaba/typedoc/classes/crossfademove.html)

CrossFadeMove will animate the from element to the target element while transitioning between the two for a seamless transition.

### [RevealMove](https://madou.github.io/yubaba/typedoc/classes/revealmove.html)

### [ConcealMove](https://madou.github.io/yubaba/typedoc/classes/concealmove.html)

### [Swipe](https://madou.github.io/yubaba/typedoc/classes/swipe.html)

Swipe will animate a block swiping over the viewport.

### [Wait](https://madou.github.io/yubaba/typedoc/classes/wait.html)

Wait is used to pause the execution of all parent animations until all children animations have completed.

### [Collector](https://madou.github.io/yubaba/typedoc/classes/collector.html)

Used as the glue for all yubaba components. It is purely an internal component which will collect and pass all props up to the parent <Baba /> component.

## API Reference

[See typedoc.](https://madou.github.io/yubaba/typedoc/)
