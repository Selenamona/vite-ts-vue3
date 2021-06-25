
<!-- 顶部导航 -->
<template>
  <div class="top-header">
    <img class="logo" src="../assets/header_logo.png" />
    <div class="nav-wrap">
      <span
        :class="[{ 'active-nav': index === active }, 'item']"
        v-for="(item,index) in titleList"
        @click="nextPage(index)"
      >{{ item }}</span>
    </div>
    <div class="location" @click="citySelect">北京</div>
    <div class="download" @click="appDownLoad">APP</div>
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
    const nextPage = (index: number) => {
      console.log(titleList[index]);
    }
    const citySelect = () => {
      console.log("选择城市");
    }
    const appDownLoad = () => {
      console.log("下载APP");
    }
    return {
      titleList,
      nextPage,
      citySelect,
      appDownLoad
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
  font-size: 16px;
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
    .active-nav {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 10px;
        width: calc(100% - 20px);
        height: 2px;
        background: #f10;
      }
    }
  }

  // CSS - 通过背景图设置右侧图标
  .location {
    background: url(../assets/down.png) no-repeat right center;
    background-size: 10px 6px;
    padding: 0 12px;
  }

  .download {
    background: url(../assets/phone_icon.png) no-repeat left center;
    background-size: 15px 18px;
    padding: 0 16px;
    margin-left: 10px;
  }
}
</style>
