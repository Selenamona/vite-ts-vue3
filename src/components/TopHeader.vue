
<!-- 顶部导航 -->
<template>
  <div class="top-header">
    <img class="logo" src="../assets/header_logo.png" />
    <div class="nav-wrap">
      <span class="item" v-for="item in titleList">{{ item }}</span>
    </div>
    <div class="location">北京</div>
    <div class="download">APP</div>
  </div>
</template>

<script lang='ts'>

export default {
  name: 'topHeader',
  props: {
    active: { type: Number }
  },
  setup(props: any) {
    console.log("  props", props)
    const titleList: Array<string> = ["首页", "新车分期", "汽车保险", "车来财", "易鑫集团", "联系我们"]
    return {
      titleList
    };
  },
};
</script>
<style lang='scss' scoped>
.top-header {
  height: 40px;
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 9999;
  display: flex;
  align-items: center;
  width: 1200px;
  transform: translate(-50%, 0);
  color: #fff;
  font-size: 14px;
  font-weight: bold;

  .logo {
    height: 30px;
  }
  .nav-wrap {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .item {
      padding: 0 10px;
    }
  }

  .location {
    background: url(../assets/down.png) no-repeat;
    padding: 0 10px;
  }
}
</style>
