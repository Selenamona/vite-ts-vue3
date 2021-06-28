<!-- 热门品牌 -->
<template>
  <div class="HotBrand">
    <div class="hot-title">热门品牌</div>
    <div class="brand-wrap">
      <div class="item" v-for="(item,index) in brandList" :key="index"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { getBrand } from '@/api/home'
import { onMounted } from 'vue';

export default {
  name: 'HotBrand',
  setup() {
    let brandList: Array<Number> = []
    onMounted(async () => {
      const res = await getBrand();
      brandList = res.dataList
    });
    return {
      brandList
    };
  },
};
</script>
<style lang='scss' scoped>
</style>
