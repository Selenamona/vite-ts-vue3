<script setup lang="ts">

// 使用类型声明时的默认 props 值
interface Props {
  msg?: string;
  labels?: string[];
}

const isAbsent = Symbol();

const props = withDefaults(defineProps<Props>(), {
  msg: "hello",
  labels: () => ["one", "two"],
  name: isAbsent
});

const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();

const changeTest = () => {
  emit("change", 2);
  emit("update", "232");
};
const a = "111";
// defineExpose 暴露属性。可以在父组件通过模板 ref 或者 $parent 链获取
defineExpose({
  a,
  changeTest
});


</script>
<template>
  <div>
    <div class="title">我是Child</div>
    <div class="content">Child 内容</div>
    <div @click="changeTest">{{ msg }}</div>
  </div>
</template>
