<!-- 热门品牌 -->
<template>
  <div class="hot-brand">
    <div class="hot-title">热门品牌</div>
    <div class="brand-wrap">
      <div
        class="item"
        v-for="(item, index) in brandList"
        :key="index"
        @click="checkeItem(item)"
      >
        <img class="icon" :src="item.icon" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getBrand } from "@/api/home";
import { inject, onMounted, reactive, toRefs } from "vue";

export default {
  name: "HotBrand",
  setup() {
    const state = reactive({
      brandList: [] as Array<any>
    });
    onMounted(async () => {
      const res = await getBrand();
      state.brandList = res.dataList;
    });

    const checkeItem = (item: any) => {
      console.log("点击热门品牌：", item.id);
    };
    const singleWord = inject("singleWord", "west"); // inject 函数有两个参数：1.property 的 name；2.默认值 (可选)
    const location: any = inject("location");
    console.log("获取 inject 值", singleWord, location);
    setTimeout(() => {
      location.south = 100;
      console.log(
        "inject 修改 provide 传递的数据（provide 使用 readonle 则不会被 inject 的组件更改）"
      );
    }, 1000);
    const a = "22"; // 父组件获取不到
    return {
      ...toRefs(state),
      checkeItem,
      singleWord,
      location
    };
  }
};
</script>
<style lang="scss" scoped>
.hot-brand {
  width: 700px;
  margin: -35px auto 0;
  position: relative;
  z-index: 9999;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgb(121, 120, 120);

  .hot-title {
    color: #000;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  .brand-wrap {
    display: flex;
    flex-wrap: wrap;
    .item {
      padding: 15px 30px;
      text-align: center;
      .icon {
        width: 40px;
        height: 40px;
        margin-bottom: 6px;
      }
    }
  }
}
</style>
