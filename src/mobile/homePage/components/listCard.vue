<!-- 首页卡片 -->
<template>
  <div class="listCard">
    <div class="item" v-for="(item, index) in list" :key="item.index">
      <img class="mainImg" :src="item.carImg" alt="" />
      <div class="whiteBody">
        <div class="desc">{{ item.description }}</div>
        <div class="info">
          <img class="avatar" :src="item.avatar" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="num">{{ item.hot }}</p>
          <img class="hot" src="@/assets/mobile/hot.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

interface ListT {
  carImg: string;
  description: string;
  avatar: string;
  name: string;
  hot: string;
  index: number;
}

export default {
  name: "listCard",
  props: {
    list: {
      type: Array as PropType<ListT[]>,
    },
  },
};
</script>
<style lang="scss" scoped>
.listCard {
  width: calc(50% - 5px);

  .item {
    background: #3a3a44;
    border-radius: 0.08rem;
    display: inline-block;
    margin-bottom: 0.12rem;

    .mainImg {
      border-radius: 0.08rem 0.08rem 0 0;
      width: 100%;
      height: 1.19rem;
    }

    .whiteBody {
      background: #ffffff;
      border-radius: 0.04rem;
      padding: 0.12rem;
      font-size: 0.13rem;
      color: #21212d;
      margin: -0.3rem 0.04rem 0.04rem;
      position: relative;
      z-index: 1;

      .desc {
        text-align: left;
        line-height: 1.5;
        font-weight: bold;
        margin-bottom: 0.09rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }

      .info {
        display: flex;
        align-items: center;
        font-size: 0.11rem;
        justify-content: space-between;

        .avatar {
          width: 0.18rem;
          height: 0.18rem;
          border-radius: 50%;
          margin-right: 0.04rem;
        }

        .hot {
          width: 0.12rem;
          height: 0.14rem;
        }

        .name {
          color: #6e727a;
          flex: 1;
          text-align: left;
        }

        .num {
          color: #656973;
          margin-right: 0.04rem;
        }
      }
    }
  }
}
</style>
