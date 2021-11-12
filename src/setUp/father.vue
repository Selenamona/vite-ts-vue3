<script setup lang="ts">
  // 参考单文件组件：https://v3.cn.vuejs.org/api/sfc-spec.html#%E4%BB%8B%E7%BB%8D

  import { onMounted, reactive, ref } from "vue";
  import Child from "./child.vue";
  const count = ref(1);
  const obj = reactive({ count });
  console.log("reactive 将解包所有深层的 refs，同时维持 ref 的响应性", obj);

  const changeFn = (id: number) => {
    console.log("子组件触发了 change", id);
  };
  const updateFn = (id: string) => {
    console.log("子组件触发了 update", id);
  };
  // const a = useCssModule("classes")
  // console.log(a);
  const theme = {
    color: "red",
  };
  const childCom = ref(null);
  const pDom = ref(null);

  // 切换皮肤
  const changeSkin: () => void = (): void => {

  }

  onMounted(() => {
    console.log("获取子组件 dom 元素", pDom.value); // 获取 dom 元素
    const a: any = childCom.value;
    console.log("获取子组件 defineExpose 暴露的变量a", a.a);
    a.changeTest(); // 调用子组件方法
  });
</script>

<template>
  <div :class="classes.title">我是父组件</div>
  <p ref="pDom" :class="classes.pColor">测试样式</p>
  <!-- <Child msg="你真棒" @change="changeFn" @update="updateFn" /> -->
  <Child ref="childCom" @change="changeFn" @update="updateFn" />
  <el-button @click="changeSkin">Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</template>

<style lang="scss" module="classes">
  // .title :deep(.content){
  //   color:#f10;
  //   font-size:16px;
  // }

  .title {
    background-color: var(--el-color-success);
  }

  .pColor {
    color: v-bind("theme.color");
  }
</style>
