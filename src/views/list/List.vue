<!-- 列表页 -->
<template>
  <div class="List">
    <haha-Hello>123</haha-Hello>
    <SwitchTabVue :tab-list="tabList" @tabChange="tabChange" />
    <section v-show="activeKey === 'hot'">选择了热门车型</section>
    <section v-show="activeKey === 'installment'">选择了分期购车</section>
  </div>
</template>

<script lang='ts'>
import SwitchTabVue from "@/components/SwitchTab.vue";
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance } from 'vue'
export default {
  name: 'List',
  setup(props: any) {
    console.log("🚀  setup ~ props", props)

    // 获取全局变量
    const instance = getCurrentInstance()
    console.log("🚀  instance", instance?.appContext.config.globalProperties.$foo)

    // 切换车源tab
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
