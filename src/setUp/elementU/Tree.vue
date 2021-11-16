<script setup lang="ts">
import { ref, reactive, watch } from "vue";

// tree 初始数据
const data = reactive([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
      {
        id: 41,
        label: "Level two 1-2",
        children: [
          {
            id: 91,
            label: "Level three 1-2-1",
          },
          {
            id: 101,
            label: "Level three 1-2-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
      {
        id: 7,
        label: "Level two o-1",
      },
      {
        id: 8,
        label: "Level two o-2",
      },
    ],
  },
]);

// 配置选项
const defaultProps = {
  children: "children", // 指定子树为节点对象的某个属性值
  label: "label", // 指定节点名称为节点对象的某个属性值
};

// 监听过滤关键字改变
const filterText = ref<string>("");
const treeDom: any = ref(null);
watch(filterText, (val) => {
  treeDom.value.filter(val);
});

// 过滤函数
const filterNode = (value: string, data: any) => {
  console.log("🚀 filterNode---", value, data);
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

// 默认选中项集合
const defaultCheckedKeys = reactive([10]);
</script>

<template>
  <el-input v-model="filterText" placeholder="Filter keyword" />

  <el-tree
    ref="treeDom"
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    show-checkbox
    default-expand-all
    :default-checked-keys="defaultCheckedKeys"
    :filter-node-method="filterNode"
  />
</template>
