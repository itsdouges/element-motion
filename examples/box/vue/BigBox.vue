<template>
  <yubaba-animate pair="small-big" :animations="animations">
    <div class="root" v-on:click="onClick"></div>
  </yubaba-animate>
</template>

<script>
import YubabaAnimate from '../../../packages/vue/src';

export default {
  name: 'big-box',
  props: ['onClick'],
  data() {
    return {
      animations: [{
        animationName: 'move',
        duration: 1000,
      }],
    };
  },
  components: {
    YubabaAnimate,
  },
}
</script>

<style scoped>
.root {
  background-color: blue;
  width: 400px;
  height: 400px;
}
</style>
