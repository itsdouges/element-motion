<h1 align="center">
  <img src="https://github.com/madou/yubaba/blob/master/icon.png?raw=true" width="100px" height="100px" style="margin:0 auto;width:100px;height:100px;" />
  <div align="center">
    yubaba
  </div>
</h1>
<div align="center">
  <a href="https://travis-ci.org/madou/yubaba"><img alt="Build Status" src="https://travis-ci.org/madou/yubaba.svg?branch=master"></a>
  <a href="https://codecov.io/gh/madou/yubaba"><img alt="codecov" src="https://codecov.io/gh/madou/yubaba/branch/master/graph/badge.svg"></a>
  <a href="https://david-dm.org/madou/yubaba"><img alt="Dependency Status" src="http://img.shields.io/david/madou/yubaba.svg?style=flat-squarer"></a>
  <a href="https://david-dm.org/madou/yubaba?type=dev"><img alt="devDependencies Status" src="https://david-dm.org/madou/yubaba/dev-status.svg"></a>
</div>

## Motivation

Animations are hard. Animations over page transitions are even harder. `CSSTransitionGroup` from React, and `ng-animate` from Angular.js are popular ways to have top level pages transition to each other. Simply add some css and off you go.

But what if we wanted to transition from one page to another using a common element on the page? And what if the common element on both pages aren't connected by a common parent? It takes a lot of work to string it together.

Yubaba aims to solve these problems, as well as supporting all popular view libraries.

## Examples

### Box

#### React [View](https://madou.github.io/yubaba/examples/box/react) | [Code](https://github.com/madou/yubaba/blob/master/examples/box/react)

<a href="https://madou.github.io/yubaba/examples/box/react"><img width="300px" src="examples/box/example.gif?raw=true" style="margin:0 auto" /></a>

### Reveal

#### React [View](https://madou.github.io/yubaba/examples/reveal/react) | [Code](https://github.com/madou/yubaba/blob/master/examples/reveal/react)

<a href="https://madou.github.io/yubaba/examples/reveal/react"><img width="300px" src="examples/reveal/example.gif?raw=true" style="margin:0 auto" /></a>

### Star Wars

#### React [View](https://madou.github.io/yubaba/examples/starwars/react) | [Code](https://github.com/madou/yubaba/blob/master/examples/starwars/react)

<a href="https://madou.github.io/yubaba/examples/starwars/react"><img width="300px" src="examples/starwars/example.gif?raw=true" style="margin:0 auto" /></a>

## Getting Started

The primary component for yubaba is `Animate`. Drop two anywhere in the component tree, and when one of them unmounts the unmouted component will start its animation.

Say we have our start component wrapped in an `Animate`:

```javascript
<Animate
  pair="my-page-transition"
  animations={[{
    animationName: 'move',
    duration: 300,
  }]}
>
  <Photo // Pretend Photo is a real component
    type="small"
    // Assume this unmounts the component when
    // called and mounts the end <Animate />
    onClick={this.openDetails}
  />
</Animate>
```

And our end component wrapped in an `Animate`:

```javascript
<Animate
  pair="my-page-transition"
  animations={[{
    animationName: 'move',
    duration: 400,
  }]}
>
  <Photo // Pretend Photo is a real component
    type="big"
    // Assume this unmounts the component when
    // called and mounts the start <Animate />
    onClick={this.closeDetails}
  />
</Animate>
```

When we click on the first component it will be unmounted, and the second component will be mounted. Yubaba will then orchestrate the animation from start component to the end component.

The same would happen when the second component is clicked, except would start at the end component.

There is another component available called `AnimateContainer`. It should be used when you have content on the page that you want to show _after_ the animation has completed. Usage of this could look like:

```javascript
<AnimateContainer pair="my-page-transition">
  <Animate
    pair="my-page-transition"
    animations={[{
      animationName: 'move',
      duration: 400,
    }]}
  >
    <Photo
      type="big"
      onClick={this.closeDetails}
    />
  </Animate>

  <p>Some Great Content</p>
</AnimateContainer>
```

The examples above this section have working implementations of `Animate` and `AnimateContainer`, have a look at their code for inspiration!

## API Docs

There is api documentation for all packages. Note that the core library won't generally be used by consumers - you're more interested in the `bindings` packages.

### [React Bindings](https://github.com/madou/yubaba/blob/master/packages/react/README.md)

### [Core Library](https://github.com/madou/yubaba/blob/master/packages/core/README.md)

## Troubleshooting

Having some trouble getting started? [Have a look at the troubleshooting page](https://github.com/madou/yubaba/blob/master/TROUBLESHOOTING.md) for some quick wins.

## How It Works

Interested in the inner workings of yubaba? [Check out the how it works page](https://github.com/madou/yubaba/blob/master/HOW_IT_WORKS.md) for an introduction.

## Local Development

### Getting started

```bash
yarn # install dependencies with yarn
npm run bootstrap # install package dependencies with lerna
```

### Running examples

Using the command `npm run example` we can run example pages easily.
Make sure to set the `EXAMPLE` environment variable for the example you're running.
Examples can be found under the `examples` folder. If you want to add a new example,
take hints from the folders already there.

If for example we wanted to run the starwars react example, we'd run the following:

```bash
EXAMPLE=starwars/react npm run example
```

### NPM scripts of note

| command | description |
|-|-|
| `react:tdd` | Run unit tests in watch for react lib |
| `core:tdd` | Run unit tests in watch for core lib |
| `docs` | Generate docs from the examples folder |
| `docs-run` | Run a static server over the docs folder |
| `test` | Test all packages |
| `clean` | Removes all packages `node_modules` |
| `example` | See above for information |

## Contributing

Contributing is love, and encouraged! Contact Michael Dougall on twitter [@itsmadou](https://twitter.com/itsmadou) if you're not sure about what task to do. Else - there are plenty of [issues](https://github.com/madou/yubaba/issues) waiting to be picked up! Comment on any to get started.

Have a cool feature you think would make a great addition? Found a bug? [Create an issue!](https://github.com/madou/yubaba/issues/new)
