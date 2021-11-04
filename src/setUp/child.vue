<script setup lang="ts">
// 使用类型声明时的默认 props 值
interface Props {
  msg?: string;
  labels?: string[];
}
const a = "111";
const props = withDefaults(defineProps<Props>(), {
  msg: "hello",
  labels: () => ["one", "two"]
});

const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();

const changeTest = () => {
  emit("change", 2);
  emit("update", "232");
};
</script>
<template>
  <div class="title">我是Child</div>
  <div class="content">Child 内容</div>
  <div @click="changeTest">{{ msg }}</div>
</template>
