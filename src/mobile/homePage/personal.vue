<!-- 个人中心 -->
<template>
  <div class="personal">
    <div class="topBg"></div>
    <!-- 头像 -->
    <div class="portrait">
      <div class="img"><img :src="source.userAvatar" alt="" /></div>
      <div class="edit">编辑资料</div>
      <div class="share">分享</div>
    </div>
    <!-- 个人介绍 -->
    <div class="introduce">
      <div class="name">{{ source.userName }}</div>
      <div class="account">
        拍车号：{{ source.loginUserId }}
        <img src="@/assets/mobile/copy.png" alt="" />
      </div>
      <div class="info">{{ source.profile }}</div>
      <div class="handle">
        <div class="phone">
          <img src="@/assets/mobile/phone.png" alt="" />
          <span>联系电话</span>
        </div>
        <div class="address">
          <img src="@/assets/mobile/my_adress.png" alt="" />
          <span>我的地址</span>
        </div>
      </div>
    </div>
    <!-- 热度统计 -->
    <div class="statistics">
      <div class="hot">
        <span class="num">{{ source.heatNum }}</span> 热度
      </div>
      <div class="focusOn">
        <span class="num">{{ source.attentionNum }}</span> 关注
      </div>
      <div class="fans">
        <span class="num">{{ source.fansNum }}</span> 粉丝
      </div>
    </div>
    <!-- 列表Tab -->
    <div class="tabwrap">
      <div :class="['item', { active: activeCode === item.key }]" v-for="item in tabList" :key="item.key" @click="selectCarType(item.key)">
        {{ item.name }} {{ item.num }}
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
  import { createList, getPersonalInfo } from "@/api/home";
  import ListCard from "./components/listCard.vue";
  import { onMounted, reactive, toRefs } from "vue";
  export default {
    name: "personal",
    setup() {
      const state = reactive({
        source: {},
        activeCode: "1",
        tabList: [
          { name: "新车", num: 6, key: "1" },
          { name: "二手车", num: 38, key: "2" }
        ],
        isLoading: false,
        leftList: [],
        rightList: []
      });
      const getData = async () => {
        const data = await getPersonalInfo();
        state.source = data.info;
      };

      const onRefresh = () => {};

      const getList = async () => {
        const res = await createList();
        state.leftList = res.info.filter((item, index) => {
          return index % 2 === 0;
        });
        state.rightList = res.info.filter((item, index) => {
          return index % 2 === 1;
        });
      };

      const selectCarType = code => {
        state.activeCode = code;
        state.leftList = [];
        state.rightList = [];
        getList();
      };

      onMounted(() => {
        getData();
        getList();
      });
      return {
        ...toRefs(state),
        selectCarType,
        onRefresh
      };
    },
    components: { ListCard }
  };
</script>
<style lang="scss" scoped>
  .personal {
    .topBg {
      width: 100%;
      height: 1.48rem;
      background: url(../../assets/images/bg.jpeg) no-repeat;
      background-size: cover;
    }

    .portrait {
      display: flex;
      align-items: center;
      font-size: 0.16rem;
      color: #d0d0d0;
      padding: 0.16rem 0.15rem 0.16rem 1.08rem;
      justify-content: space-between;
      border-radius: 0.08rem 0.08rem 0 0;
      position: relative;
      margin-top: -0.08rem;
      background: #1e1e23;

      .img {
        position: absolute;
        border-radius: 50%;
        width: 0.8rem;
        height: 0.8rem;
        top: -0.13rem;
        left: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #18181c;

        img {
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 50%;
        }
      }

      .edit {
        width: 1.84rem;
        height: 0.36rem;
        line-height: 0.36rem;
        background: #393b44;
        border-radius: 0.18rem;
      }

      .share {
        width: 0.6rem;
        height: 0.36rem;
        line-height: 0.36rem;
        background: #393b44;
        border-radius: 18px;
      }
    }

    .introduce {
      text-align: left;
      padding: 0.1rem 0.15rem;

      .name {
        font-size: 0.2rem;
        color: #e2e8f4;
        font-weight: bold;
      }

      .account {
        font-size: 0.12rem;
        color: #6e727a;
        margin: 0.08rem 0 0.18rem;

        img {
          width: 0.1rem;
          height: 0.1rem;
          margin-left: 0.08rem;
        }
      }

      .info {
        font-size: 0.12rem;
        line-height: 1.5;
        color: #b5b6c3;
      }

      .handle {
        display: flex;
        margin: 0.1rem 0;

        .phone {
          margin-right: 0.08rem;
        }

        .phone,
        .address {
          background: #2d2f37;
          border-radius: 0.14rem;
          width: 0.85rem;
          height: 0.24rem;
          font-size: 0.12rem;
          color: #90909b;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 0.1rem;
            height: 0.12rem;
            margin-right: 0.07rem;
          }
        }
      }
    }

    .statistics {
      display: flex;
      justify-content: space-between;
      margin: 0 0.15rem;
      padding: 0 0.15rem 0.2rem;
      border-bottom: 1px solid #31343a;

      .hot,
      .focusOn,
      .fans {
        font-size: 0.14rem;
        color: #b5b6c3;

        .num {
          font-size: 0.14rem;
          font-weight: bold;
          color: #e2e8f4;
        }
      }
    }

    .tabwrap {
      display: flex;
      justify-content: space-around;
      font-size: 0.15rem;
      font-weight: bold;
      color: #6e727a;
      padding: 0.12rem 0;
      margin-bottom: 0.12rem;

      .active {
        color: #ffffff;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          background: #ffffff;
          border-radius: 0.01rem;
          width: 0.2rem;
          height: 0.03rem;
          bottom: -0.1rem;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }

    .listWrap {
      display: flex;
      padding-bottom: 0.6rem;
    }
  }
</style>
