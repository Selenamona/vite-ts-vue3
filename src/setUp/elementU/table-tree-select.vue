<script setup lang="ts">
import { ref } from "vue";
// 初始数据;
const tableData2 = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu"
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu"
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    children: [
      {
        id: 31,
        date: "2016-06-01",
        name: "wangxiaohu",
        children: [
          {
            id: 98,
            date: "2016-07-02",
            name: "wangxiaohu"
          },
          {
            id: 987,
            date: "2016-07-01",
            name: "wangxiaohu"
          }
        ]
      },
      {
        id: 32,
        date: "2016-06-02",
        name: "wangxiaohu",
        children: [
          {
            id: 77,
            date: "2016-07-01",
            name: "wangxiaohu"
          },
          {
            id: 86,
            date: "2016-07-02",
            name: "wangxiaohu"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu"
  }
];

// 格式化数据(子元素赋值父元素所在下标)
const formatArr = (arr: object[]) => {
  const recurFormat = (obj: any, j: number) => {
    obj.children.forEach((child: any, k: number) => {
      child.pIndex = j;
      child.parent = obj;
      if (child.children?.length) {
        recurFormat(child, k);
      }
    });
  };
  arr.forEach((item: any, index) => {
    if (item.children?.length) {
      recurFormat(item, index);
    }
  });
};
formatArr(tableData2);

const multipleTable: any = ref(null);
// 根据父节点动态切换子节点选中状态
const recursiveFn = (arr: [], isCheck: boolean) => {
  arr.forEach((item: any) => {
    item.rowCheck = isCheck;
    if (item.children?.length) {
      recursiveFn(item.children, isCheck);
    }
  });
};

// 检查选中状态: 1(全选) 0(半选) -1(未选)
const checkRowState = (obj: any) => {
  let hasEmpty = false,
    hasChecked = false;
  for (let i = 0; i < obj.children.length; i++) {
    const item = obj.children[i];
    if (item.rowCheck && !hasChecked) {
      hasChecked = true;
    }
    if (!item.rowCheck && !hasEmpty) {
      hasEmpty = true;
    }
    if (hasChecked && hasEmpty) {
      obj.halfCheck = true; // 半选
      if (obj.parent) obj.parent.halfCheck = true; // 子级半选父级也半选;
      return;
    }
  }
  obj.halfCheck = false;
  obj.rowCheck = hasChecked ? true : false;
  if (obj.parent) checkRowState(obj.parent);
};

// Checkbox 勾选某一项
const pageCheckEv = (scope: any) => {
  const row = scope.row;
  console.log(scope, 321, row.rowCheck);
  // 遍历子元素
  if (row.children?.length) {
    recursiveFn(scope.row.children, row.rowCheck);
  }
  // 查找父元素
  if (!row.parent) return;
  checkRowState(row.parent);
};

let multipleSelection: [] = [];
const handleSelectionChange = (val: any) => {
  console.log("handleSelectionChange", val);

  // val.forEach((item: any) => {
  //   if (item.children.length) {
  //     recursiveFn(item.children)
  //   }
  // })
  // multipleSelection = val
  // console.log("multipleSelection", multipleSelection);
};
</script>

<template>
  <!-- 折叠 -->
  <el-table ref="multipleTable" :data="tableData2" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all @selection-change="handleSelectionChange"
    header-row-class-name="tree-table-header">
    <el-table-column type="selection" width="55">
      <!-- 被 selecttion 覆盖，不生效 -->
      <!-- <template slot="header" #header="scope">
        <span>assa</span>
      </template> -->
      <template #default="scope">
        <el-checkbox v-show="scope.$index!==0" v-model="scope.row.rowCheck" @change="pageCheckEv(scope)" :indeterminate="scope.row.halfCheck"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="date" sortable width="180" />
    <el-table-column prop="name" label="Name" sortable width="180" />
  </el-table>
</template>

<style lang="scss">
.tree-table-header {
  th:first-child .el-checkbox {
    display: none;
  }
}
</style>

 