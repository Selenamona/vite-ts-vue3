<script setup lang="ts">
// 参考单文件组件：https://v3.cn.vuejs.org/api/sfc-spec.html#%E4%BB%8B%E7%BB%8D

import { onMounted, ref } from "vue";
import Child from "./child.vue";

const changeFn = (id: number) => {
  console.log("触发了change", id);
};
const updateFn = (id: string) => {
  console.log("触发了update", id);
};
// const a = useCssModule("classes")
// console.log(a);
const theme = {
  color: "red"
};
const childCom = ref(null);
const pDom = ref(null);

onMounted(() => {
  console.log(pDom.value, "p"); // 获取 dom 元素
  const a: any = childCom.value;
  console.log(a, a.a, "a");
  a.changeTest();
});
</script>

<template>
  <div class="title">我是父组件</div>
  <p ref="pDom" class="pColor">测试样式</p>
  <!-- <Child msg="你真棒" @change="changeFn" @update="updateFn" /> -->
  <Child ref="childCom" @change="changeFn" @update="updateFn" />
</template>

<style scoped lang="scss" module="classes">
// .title :deep(.content){
//   color:#f10;
//   font-size:16px;
// }

.pColor {
  color: v-bind("theme.color");
}
</style>
