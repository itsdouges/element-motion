<template>
  <div>
    <small-box v-if="!showBig"></small-box>
    <big-box v-if="showBig"></big-box>
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
  components: {
    BigBox,
    SmallBox,
  },
}
</script>
