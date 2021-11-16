<!--  -->
<script setup lang="ts">
const tableData = [
  {
    id: "1",
    name: "用户中心",
    list: [
      {
        name: "成员和部门",
        list: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
      },
      {
        name: "角色管理",
        list: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
      },
      {
        name: "岗位管理",
        list: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
      },
    ],
  },
  {
    id: "2",
    name: "用户中心2",
    list2: [
      {
        name: "成员和部门",
        list: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
      },
      {
        name: "角色管理",
        list: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
      },
      {
        name: "岗位管理",
        list: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
      },
    ],
  },
];
</script>
<template>
  <el-scrollbar height="400px">
    <div>
      <el-row>
        <el-col :span="6"><div class="grid-content">一级菜单</div></el-col>
        <el-col :span="6"><div class="grid-content">二级菜单</div></el-col>
        <el-col :span="12"><div class="grid-content">页面布局</div></el-col>
      </el-row>
      <el-row v-for="item in tableData" :key="item.id">
        <el-col :span="6">
          <div class="grid-content">{{ item.name }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content" v-for="ele in item.list" :key="ele.name">
            {{ ele.name }}
          </div>
        </el-col>
        <el-col :span="12"><div class="grid-content">页面布局</div></el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped></style>
