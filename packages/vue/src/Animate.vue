<template>
  <transition>
    <div :style="calcStyle()">
      <slot>
      </slot>
    </div>
  </transition>
</template>

<script>
// @flow

import Vue from 'vue';
import { orchestrator, removeFromStore, addListener } from 'yubaba-core';

export default {
  name: 'yubaba-animate',

  props: {
    pair: String,
    animations: Array,
  },

  data() {
    return {
      visible: false,
    };
  },

  mounted () {
    this._detatch = addListener(this.pair, this.setVisibility);
    this.initialise();
  },

  beforeDestroy () {
    this._detatch();
    this.initialise();

    console.log(this.$el.getBoundingClientRect());
    console.log(this._isBeingDestroyed);

    if (this.$el.firstElementChild) {
      removeFromStore(this.pair, this.$el.firstElementChild, true);
    }
  },

  methods: {
    calcStyle () {
      return {
        opacity: this.visible ? 1 : 0,
      };
    },
    initialise () {
      if (!this.$el.firstElementChild) {
        return;
      }

      orchestrator(this.pair, {
        node: this.$el.firstElementChild,
        animations: this.animations,
        shouldShow: this.setVisibility,
      });
    },
    setVisibility(visible) {
      this.visible = visible;
    },
  },
};
</script>
