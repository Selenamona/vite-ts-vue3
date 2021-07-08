<!-- 列表页 -->
<template>
  <div class="List">
    <SwitchTabVue :tab-list="tabList" @tabChange="tabChange" />
    <section v-show="activeKey === 'hot'">选择了热门车型</section>
    <section v-show="activeKey === 'installment'">选择了分期购车</section>
  </div>
</template>

<script lang='ts'>
import SwitchTabVue from "@/components/SwitchTab.vue";
import { reactive, ref } from "@vue/reactivity";

export default {
  name: 'List',
  setup(props: any) {
    let activeKey = ref('hot')
    const tabList = ref([{ name: "热门", key: "hot" }, { name: "分期购车", key: "installment" }])
    const tabChange = (key: string) => {
      activeKey.value = key
    }
    return {
      activeKey,
      tabList,
      tabChange
    };
  },
  components: { SwitchTabVue }
};
</script>
<style lang='scss' scoped>
</style>
