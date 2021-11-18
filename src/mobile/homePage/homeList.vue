<!-- 首页列表 -->
<template>
  <div class="homeList">
    <!-- 排行 -->
    <Rank />
    <!-- 切换车型 -->
    <div class="subTab">
      <div
        :class="['tab', { active: activeCode === item.code }]"
        v-for="item in tabList"
        :key="item.code"
        @click="selectCarType(item.code)"
      >
        {{ item.title }}
      </div>
      <div class="search">
        <img src="@/assets/mobile/search.png" alt="" />
      </div>
    </div>
    <!-- 列表数据 -->
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="listWrap">
        <ListCard :list="leftList" />
        <ListCard :list="rightList" style="margin-left: 10px" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from "vue";
import Rank from "./components/rank.vue";
import ListCard from "./components/listCard.vue";
import { createList } from "@/api/home";
export default {
  name: "homeList",
  components: { Rank, ListCard },
  setup() {
    const state = reactive({
      activeCode: 0,
      isLoading: false,
      tabList: [
        { title: "所有", code: 0 },
        { title: "新车", code: 1 },
        { title: "二手车", code: 2 },
      ],
      leftList: [],
      rightList: [],
    });
    const onRefresh = () => {};

    const getList = async () => {
      const res: any = await createList();
      state.leftList = res.info.filter((item: any, index: number) => {
        return index % 2 === 0;
      });
      state.rightList = res.info.filter((item: any, index: number) => {
        return index % 2 === 1;
      });
    };

    const selectCarType = (code: any) => {
      state.activeCode = code;
      state.leftList = [];
      state.rightList = [];
      getList();
    };

    onMounted(() => {
      getList();
    });

    return {
      ...toRefs(state),
      onRefresh,
      selectCarType,
    };
  },
};
</script>
<style lang="scss" scoped>
.homeList {
  padding: 0 0.15rem;

  .subTab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.12rem 0;

    .tab {
      font-size: 0.13rem;
      font-weight: bold;
      color: #ffffff;
      background: #2c2c33;
      border: 1px solid #3c3c43;
      border-radius: 0.14rem;
      padding: 0.05rem 0.12rem;
      margin-right: 0.1rem;
    }

    .active {
      background: #ffd500;
      color: #21212d;
    }

    .search {
      flex: 1;
      height: 0.2rem;

      img {
        display: block;
        float: right;
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }

  .listWrap {
    display: flex;
    padding-bottom: 0.6rem;
  }
}
</style>
