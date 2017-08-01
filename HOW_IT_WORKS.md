# How Yubaba Works

Yubaba is split into two main package types.

The first is the core library at `yubaba-core`. The second is the view bindings, for example the React bindings in `react-yubaba`.

## Core

The core library is where all the meat and potatoes are. It does both the page transition orchestration, as well as execute the animations themselves.

## View Bindings

The view bindings are thin wrappers over the top of the core library orchestrator and animator.

## How does an `<Animate />` pair transition to each other?

Let's look at the [react reveal example](https://github.com/madou/yubaba/blob/master/examples/reveal/react).

1. `<App />` is rendered into the DOM, the list of items are shown first.
1. Because there is no pair found yet `BoxWithTransition` is shown immediately.
1. `BoxWithTransition` registers to `orchestrator` on mount with its `pair` name.
1. We click on the `BoxWithTransition`.
1. `BoxWithTransition` unmounts, and notifies `orchestrator` of its final dimensions and location in the viewport.
1. `BoxWithContent` mounts and registers to the `orchestrator` with its `pair` name.
1. Because there is a `pair` already waiting `BoxWithContent` is not shown immediately.
1. For each animation definition in the `animations` prop, there is a handling animation. See `packages/core/src/animations` for the pre-defined handlers.
1. When the animation handler is called it recieves the dimensions and locations from step 5, does calculations with them and the destination element, and then returns `keyframes`. Most `animation` handlers will opt to create a clone of the source element.
1. The `keyframes` are then pumped into the Web Animations API, thus the animation happens.
1. Once the animation has been finished `BoxWithContent` is then shown.
1. You'll note there is also an `AnimateContainer` with same `pair` name. The children of `AnimateContainer` will be shown based on the same rules as `Animate`. Either shown immediately if there is no pending `pair`, or delayed until the `animation` has finished.
