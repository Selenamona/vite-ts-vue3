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
import { getBrand } from '../../../api/home'

export default {
  name: 'HotBrand',
  setup(props) {
    const brandList: Array<Number> = []
    getBrand()
    return {
      brandList
    };
  },
};
</script>
<style lang='scss' scoped>
</style>
