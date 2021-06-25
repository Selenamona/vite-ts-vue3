<!-- 首页轮播图 -->
<template>
  <div class="Carousel">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Carousel',
};
</script>
<style lang='scss' scoped>
.Carousel {
}
</style>
