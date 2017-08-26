<template>
  <div>
    <small-box :on-click="setBig" v-if="!showBig"></small-box>
    <big-box :on-click="setBig" v-if="showBig"></big-box>
  </div>
</template>

<script>
import BigBox from './BigBox.vue';
import SmallBox from './SmallBox.vue';

export default {
  name: 'app',
  data() {
    return {
      showBig: false,
    };
  },
  methods: {
    setBig() {
      this.showBig = !this.showBig;
    },
  },
  components: {
    BigBox,
    SmallBox,
  },
}
</script>
