<p align="center">
  <br />
  <img src="https://github.com/madou/yubaba/blob/master/icon.png?raw=true" style="margin:0 auto" />
</p>

<h1 align="center">
  yubaba

  <a href="https://travis-ci.org/madou/yubaba"><img alt="Build Status" src="https://travis-ci.org/madou/yubaba.svg?branch=master"></a>
</h1>

Yubaba is an animation orchestration library that aims to expose a simple api to perform complex animations between page elements. React bindings are available, with Vue, Angular, and more coming soon.

It's as easy as defining your start component:

```javascript
const SmallBox = () => (
  <Animate pair="my-animation" animations={[{
    animationName: 'move',
    duration: 500,
  }]}>
    <div className="my-small-box" />
  </Animate>
);
```

Defining your end component:

```javascript
const BigBox = () => (
  <Animate pair="my-animation" animations={[{
    animationName: 'move',
    duration: 500,
  }]}>
    <div className="my-big-box" />
  </Animate>
);
```

And mounting them when appropriate:

```javascript
<div>
  {bigShown && <BigBox />}
  {bigShown || <SmallBox />}
</div>
```

Yubaba does all the heavy lifting behind the scenes! Check out the README's below.

## [Yubaba Core README](https://github.com/madou/yubaba/blob/master/packages/core/README.md)

## [React Bindings README](https://github.com/madou/yubaba/blob/master/packages/react/README.md)

## [Troubleshooting](https://github.com/madou/yubaba/blob/master/TROUBLESHOOTING.md)

## Examples

### [React: The Dark Side](https://github.com/madou/yubaba/tree/master/packages/react/test/examples/dark-side/)

<p align="center">
  <br />
  <a href="https://madou.github.io/yubaba/"><img src="https://github.com/madou/yubaba/blob/master/packages/react/test/examples/dark-side/example.gif?raw=true" style="margin:0 auto" /></a>
</p>
