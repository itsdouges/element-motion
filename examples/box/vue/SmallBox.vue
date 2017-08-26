<template>
  <yubaba-animate pair="small-big" :animations="animations">
    <div class="root" v-on:click="onClick"></div>
  </yubaba-animate>
</template>

<script>
import YubabaAnimate from '../../../packages/vue/src';

export default {
  name: 'small-box',
  props: ['onClick'],
  data() {
    return {
      animations: [{
        animationName: 'move',
        duration: 500,
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
  width: 100px;
  height: 100px;
}
</style>
