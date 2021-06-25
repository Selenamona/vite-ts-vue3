<!-- 首页 -->
<template>
  <div class="Home">
    <CarouselVue />
  </div>
</template>

<script lang="ts">
import CarouselVue from "./components/Carousel.vue";
export default {
  name: 'Home',
  components: { CarouselVue }
};
</script>
<style lang='scss' scoped>
</style>
