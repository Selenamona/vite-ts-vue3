<!-- 首页排名 -->
<template>
  <div class="rank">
    <div class="item" v-for="(item, index) in rankData" :key="item.userId">
      <div class="img" :style="rankImgs[index].background">
        <img class="portrait" :src="item.userAvatar" alt="" />
        <img class="icon" :src="rankImgs[index].img" alt="" />
      </div>
      <p class="nickName">{{ item.userName }}</p>
    </div>
    <div class="rankAll">全部</div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "rank",
    setup() {
      const rankData = [{
          userId: 100021,
          userName: "高傲女王百毒不侵",
          userAvatar: "/static/avatar/1.jpeg",
          profile: "哈哈车神",
          hot: 977
        },
        {
          userId: 100032,
          userName: "Selenamona",
          userAvatar: "/static/avatar/2.jpeg",
          profile: null,
          hot: 411
        },
        {
          userId: 100033,
          userName: "少年逆光而立",
          userAvatar: "/static/avatar/3.jpeg",
          profile: "全宇宙最拉轰的车行",
          hot: 380
        },
        {
          userId: 100054,
          userName: "鬼龙帝",
          userAvatar: "/static/avatar/4.jpeg",
          profile: "林肯在外观上非常的霸气，还拥有惊人的体型和出色的实用性以及宽敞、舒适的驾乘空间。",
          hot: 233
        },
        {
          userId: 100025,
          userName: "Extreme极致",
          userAvatar: "/static/avatar/5.jpg",
          profile: "保时捷是一个知名的跑车品牌，在骨子里刻下了赛车场上激情澎湃的基因。在车身轮廓比例方面保持保时捷传统的形象。",
          hot: 226
        }
      ];
      const rankImgs = [{
          img: "/@/assets/mobile/rank1.png",
          background: "background-image: linear-gradient(162deg, #FF6F72 0%, #FF4B4E 100%);"
        },
        {
          img: "/@/assets/mobile/rank2.png",
          background: "background-image: linear-gradient(159deg, #FF6B66 0%, #F46631 100%);"
        },
        {
          img: "/@/assets/mobile/rank3.png",
          background: "background-image: linear-gradient(159deg, #FFE678 0%, #FFB517 100%);"
        },
        {
          img: "/@/assets/mobile/rank4.png",
          background: "background-image: linear-gradient(159deg, #FFCDA2 0%, #F19749 100%);"
        },
        {
          img: "/@/assets/mobile/rank5.png",
          background: "background-image: linear-gradient(159deg, #FFCDA2 0%, #F19749 100%);"
        }
      ];
      return {
        rankData,
        rankImgs
      };
    }
  };
</script>
<style lang="scss" scoped>
  .rank {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #31343a;
    padding: 0.12rem 0;

    .item {
      .nickName {
        font-size: 0.11rem;
        color: #bfbfc1;
        margin-top: 0.09rem;
        width: 0.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }

      .img {
        position: relative;
        width: 0.48rem;
        height: 0.48rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .portrait {
          border-radius: 50%;
          display: block;
          width: 0.44rem;
          height: 0.44rem;
        }

        .icon {
          position: absolute;
          bottom: 0;
          left: 0.24rem;
          width: 0.24rem;
          height: 0.16rem;
          z-index: 1;
        }
      }
    }

    .rankAll {
      font-size: 0.12rem;
      color: #ffd500;
      margin-top: 0.24rem;
      transform: translate(0, -0.06rem);
    }
  }
</style>
