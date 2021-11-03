<script setup lang="ts">
import Child from "./child.vue";

const changeFn = (id) => {
  console.log("触发了change",id);
};
const updateFn = (id) => {
  console.log("触发了update",id);
};
// const a = useCssModule("classes")
// console.log(a);
const theme = {
  color:"red"
}

</script>

<template>
  <div class="title">我是父组件</div>
  <p class="pColor">测试样式</p>
  <!-- <Child msg="你真棒" @change="changeFn" @update="updateFn" /> -->
  <Child  @change="changeFn" @update="updateFn" />
</template>

<style scoped lang="scss" module="classes">
// .title :deep(.content){
//   color:#f10;
//   font-size:16px;
// }

.pColor{
   color: v-bind('theme.color');
}
</style>
