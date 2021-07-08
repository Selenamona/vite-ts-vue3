
<!-- 页签切换 -->
<template>
  <div class="SwitchTab">
    <div
      class="item"
      v-for="item in tabList"
      :key="item.key"
      @click="onChange(item.key)"
    >{{ item.name }}</div>
  </div>
</template>

<script lang='ts'>
import { SetupContext } from 'vue';

export default {
  name: 'SwitchTab',
  props: {
    tabList: {
      type: Array,
      default: []
    }
  },
  setup(props: any, { emit }: SetupContext) {
    const tabList = props.tabList
    const onChange = (key: string) => {
      emit("tabChange", key)
    }
    return {
      onChange,
      tabList
    };
  },
  components: {}
};
</script>
<style lang='scss' scoped>
</style>
