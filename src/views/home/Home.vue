<!-- 首页 -->
<template>
  <div class="Home">
    <TopHeader :active="0" />
    <CarouselVue ref="CarouselVue" />
    <HotBrands ref="HotBrands" />
  </div>
</template>

<script lang="ts">
import CarouselVue from "@/components/Carousel.vue";
import TopHeader from "@/components/TopHeader.vue";
import HotBrands from "./components/HotBrand.vue";
import { onMounted, ref } from "vue";
export default {
  name: "Home",
  components: { CarouselVue, TopHeader, HotBrands },
  setup() {
    // ref 引用子组件: 在 mounted 中获取数据，定义的变量需 return
    const HotBrands = ref(null);
    onMounted(() => {
      console.log(HotBrands.value);
    });
    return {
      HotBrands
    };
  }
};
</script>
<style lang="scss" scoped></style>
