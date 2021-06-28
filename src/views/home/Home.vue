<!-- 首页 -->
<template>
  <div class="Home">
    <TopHeader :active="0" />
    <CarouselVue />
    <HotBrands />
  </div>
</template>

<script lang="ts">
import CarouselVue from "@/components/Carousel.vue";
import TopHeader from "@/components/TopHeader.vue";
import HotBrands from "./components/HotBrand.vue"
export default {
  name: 'Home',
  components: { CarouselVue, TopHeader, HotBrands }
};
</script>
<style lang='scss' scoped>
</style>
