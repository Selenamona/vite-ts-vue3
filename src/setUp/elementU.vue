<script setup lang="ts">
import { ref } from "vue";
const tableData = [
  {
    id: "12987122",
    name: "Yjm",
    amount1: "234",
    amount2: "3.2",
    amount3: 10
  },
  {
    id: "12987123",
    name: "Jan",
    tag: "merge",
    rowNum: 3,
    amount1: "165",
    amount2: "4.43",
    amount3: 12
  },
  {
    id: "12987124",
    name: "Kin",
    amount1: "324",
    amount2: "1.9",
    amount3: 9
  },
  {
    id: "12987125",
    name: "Kin",
    amount1: "621",
    amount2: "2.2",
    amount3: 17
  },
  {
    id: "12987126",
    name: "Kin",
    tag: "merge",
    rowNum: 2,
    amount1: "539",
    amount2: "4.1",
    amount3: 15
  },
  {
    id: "12987127",
    name: "Tom",
    amount1: "324",
    amount2: "1.9",
    amount3: 9
  },
  {
    id: "12987128",
    name: "Tom",
    amount1: "621",
    amount2: "2.2",
    amount3: 17,
    tag: "merge",
    rowNum: 2
  },
  {
    id: "12987129",
    name: "Tom",
    amount1: "539",
    amount2: "4.1",
    amount3: 15
  }
];

const newArr: object[] = [];
const orderList = () => {
  const ls: any = {};
  tableData.forEach((item, index) => {
    if (ls[item.name]) {
      ls[item.name].push(index);
    } else {
      ls[item.name] = [];
      ls[item.name].push(index);
    }
  });
  Object.keys(ls).forEach((key) => {
    if (ls[key].length > 1) {
      newArr.push(ls[key]);
    }
  });
};

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  // console.log(row, column, rowIndex, columnIndex);
  if (columnIndex === 1) {
    for (let i = 0; i < newArr.length; i += 1) {
      let element: any = newArr[i]; // [2,3]
      for (let j = 0; j < element.length; j += 1) {
        let item = element[j]; // 2
        if (rowIndex === item) {
          if (j === 0) {
            console.log(element, item, i, j);
            return {
              rowspan: element.length,
              colspan: 1
            };
          }
          if (j !== 0) {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
    // 注意！不能用 forEach！
    // newArr.forEach((arr: any, index) => {
    //   arr.forEach((num: number, k: number) => {
    //     if (rowIndex == num) {
    //       if (k == 0) {
    //         console.log(arr, num, index, k);
    //         return {
    //           rowspan: arr.length,
    //           colspan: 1,
    //         }
    //       }
    //       if (k != 0) {
    //         return {
    //           rowspan: 0,
    //           colspan: 0,
    //         }
    //       }
    //     }
    //   })
    // })
  }
};

orderList();

const scheduleList = [
  {
    date: "第一天",
    journey: "报道",
    lecturer: ""
  },
  {
    date: "第二天",
    journey: "企业生产安全应急预案数字化推演及复盘",
    lecturer: "国家危化品应急救援基地--林俊"
  },
  {
    date: "第三天",
    journey: "火灾应急处置",
    lecturer: "国家危化品应急救援基地—张学军"
  },
  {
    date: "第三天",
    journey: "中毒窒息事故应急处置",
    lecturer: "中化岙山事故应急处置师资"
  },
  {
    date: "第四天",
    journey: "人员触电事故应急处置",
    lecturer: "中化岙山事故应急处置师资"
  },
  {
    date: "第四天",
    journey: "泄漏事故应急处置",
    lecturer: "中化岙山事故应急处置师资"
  },
  {
    date: "第四天",
    journey: "问题交流",
    lecturer: "中化岙山事故应急处置师资"
  },
  {
    date: "第五天",
    journey: "受限空间作业管理",
    lecturer: "中化岙山危险作业内训师"
  },
  {
    date: "第五天",
    journey: "高处作业管理",
    lecturer: "中化岙山危险作业内训师"
  },
  {
    date: "第五天",
    journey: "动火作业管理",
    lecturer: "中化岙山危险作业内训师"
  },
  {
    date: "第五天",
    journey: "临时用电作业管理",
    lecturer: "中化岙山危险作业内训师"
  },
  {
    date: "第五天",
    journey: "问题交流与讨论",
    lecturer: "中化岙山危险作业内训师"
  },
  {
    date: "第六天",
    journey: "回城",
    lecturer: ""
  }
];

let orderIndexArr: object[] = [];
const getOrderNumber = () => {
  const orderObj: any = {};
  scheduleList.forEach((item, index) => {
    if (orderObj[item.date]) {
      orderObj[item.date].push(index);
    } else {
      orderObj[item.date] = [];
      orderObj[item.date].push(index);
    }
  });
  // 将数组长度大于1的值 存储到 orderIndexArr（也就是需要合并的项）
  Object.keys(orderObj).forEach((key) => {
    if (orderObj[key].length > 1) {
      orderIndexArr.push(orderObj[key]);
    }
  });
  // console.log(orderIndexArr, "orderIndexArr");
};
const objectSpanMethod2 = ({ row, column, rowIndex, columnIndex }: any) => {
  if (columnIndex === 0 || columnIndex === 2) {
    for (let i = 0; i < orderIndexArr.length; i += 1) {
      let element: any = orderIndexArr[i]; // [2,3]
      for (let j = 0; j < element.length; j += 1) {
        let item = element[j]; // 2
        if (rowIndex === item) {
          if (j === 0) {
            return {
              rowspan: element.length,
              colspan: 1
            };
          }
          if (j !== 0) {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  }
};
getOrderNumber();

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
        date: "2016-05-01",
        name: "wangxiaohu",
        children: [
          {
            id: 98,
            date: "2016-05-01",
            name: "wangxiaohu"
          },
          {
            id: 987,
            date: "2016-05-01",
            name: "wangxiaohu"
          }
        ]
      },
      {
        id: 32,
        date: "2016-05-01",
        name: "wangxiaohu",
        children: [
          {
            id: 77,
            date: "2016-05-01",
            name: "wangxiaohu"
          },
          {
            id: 86,
            date: "2016-05-01",
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

const multipleTable: any = ref(null);
const recursiveFn = (arr: [], isCheck: boolean) => {
  arr.forEach((item: any) => {
    console.log(item);
    multipleTable.value.toggleRowSelection(item, isCheck); // 切换子节点选中状态
    if (item.children?.length) {
      recursiveFn(item.children, isCheck);
    }
  });
};

// 手动勾选数据行的 Checkbox
const selectRow = (selection: [], row: any) => {
  const isCheck: boolean = selection.includes(row as never);
  if (row.children?.length) {
    recursiveFn(row.children, isCheck);
  }
};

let multipleSelection: [] = [];
const handleSelectionChange = (val: any) => {
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
  <!-- 表格合并行 -->
  <!-- <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="amount1" label="Amount 1" />
    <el-table-column prop="amount2" label="Amount 2" />
    <el-table-column prop="amount3" label="Amount 3" />
  </el-table>
  <el-table :data="scheduleList" :span-method="objectSpanMethod2" border>
    <el-table-column prop="date" label="时间" width="120"></el-table-column>
    <el-table-column prop="journey" label="行程" width="600"></el-table-column>
    <el-table-column prop="lecturer" label="讲师"></el-table-column>
  </el-table> -->
  <!-- 折叠 -->
  <el-table ref="multipleTable" :data="tableData2" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all @select="selectRow" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <!-- <template #default="scope">
        <el-button size="mini" v-show="scope.$index!=0">Edit</el-button>
      </template> -->
    <!-- </el-table-column> -->
    <el-table-column prop="date" label="date" sortable width="180" />
    <el-table-column prop="name" label="Name" sortable width="180" />
  </el-table>
</template>
