<!-- 首页 -->
<template>
  <div class="Home">
    <TopHeader :active="0" />
    <CarouselVue />
  </div>
</template>

<script lang="ts">
import CarouselVue from "@/components/Carousel.vue";
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: 'Home',
  components: { CarouselVue, TopHeader }
};
</script>
<style lang='scss' scoped>
</style>
