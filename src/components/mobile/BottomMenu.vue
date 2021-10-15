<template>
  <div class="fixed-bottom">
    <div :class="[{ active: activeKey === 1 }, 'text']" @click="nextPage(1)">
      首页
    </div>
    <img src="@/assets/images/logo.png" alt="" />
    <div :class="[{ active: activeKey === 2 }, 'text']" @click="nextPage(2)">
      我的
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "HelloWorld",
  setup(props, { emit }) {
    let activeKey = ref(1);
    const nextPage = tab => {
      activeKey.value = tab;
      emit("selectTab", tab);
    };
    return {
      activeKey,
      nextPage
    };
  }
};
</script>

<style lang="scss" scoped>
.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #151518;
  z-index: 10;
  img {
    width: 0.28rem;
    height: 0.28rem;
  }
  .text {
    position: relative;
    color: #6e727a;
    font-size: 0.17rem;
    font-weight: bold;
    flex: 1;
    &::after {
      content: "";
      width: 0.2rem;
      height: 0.02rem;
      border-radius: 0.02rem;
      background: #151518;
      position: absolute;
      bottom: -0.15rem;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .active {
    color: #ffffff;
    &::after {
      background: #fff;
    }
  }
}
</style>
