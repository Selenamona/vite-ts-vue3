<!-- 首页轮播图 -->
<template>
  <div class="carousel">
    <el-carousel height="400px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img class="banner" :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import img1 from '@/assets/banner/banner1.png'
import img2 from '@/assets/banner/banner2.png'
import img3 from '@/assets/banner/banner3.png'
export default {
  name: 'Carousel',
  setup() {
    const imgList: string[] = [img1, img2, img3]
    return {
      imgList
    }
  }
};
</script>
<style lang='scss' scoped>
.carousel {
  .banner {
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss">
.carousel .el-carousel__indicators {
  bottom: 50px;
}
</style>
