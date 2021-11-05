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
import { InjectionKey, onMounted, provide, reactive, readonly, ref } from "vue";
export default {
  name: "Home",
  components: { CarouselVue, TopHeader, HotBrands },
  setup() {
    // ref 引用子组件: 在 mounted 中获取数据，定义的变量需 return
    const HotBrands = ref(null);
    onMounted(() => {
      const a: any = HotBrands.value;
      console.log("HOME 通过模版 ref 获取子组件", a); // 只可以获取到子组件return出来的变量和方法
      console.log("HOME 通过模版 ref 获取子组件 return 的变量", a.brandList); // 只可以获取到子组件return出来的变量和方法
      console.log("HOME 通过模版 ref 获取子组件未 return 变量", a.a); // 只可以获取到子组件return出来的变量和方法
    });

    // 使用 ref 和 reactive 增加 provide 值和 inject 值之间的响应性
    // const key: InjectionKey<string> = Symbol();
    // provide(key, "foo"); // 若提供非字符串值将出错
    // const singleWord = ref("north world");
    // provide("singleWord", singleWord);
    const location = reactive({
      south: "90",
      north: "135"
    });
    // 使用 readonle 则不会被 inject 的组件更改
    // const location = reactive(
    //   readonly({
    //     south: "90",
    //     north: "135"
    //   })
    // );
    setTimeout(() => {
      console.log("provide 传递的原始数据 {south:90, north:135}", location);
    }, 2000);
    provide("location", location);

    // 暴露给模板
    return {
      HotBrands
    };
  }
};
</script>
<style lang="scss" scoped></style>
