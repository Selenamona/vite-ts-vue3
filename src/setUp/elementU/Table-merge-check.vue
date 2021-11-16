<!--  -->
<script setup lang="ts">
import { reactive } from "vue";

const tableData: any = reactive([
  {
    id: "1",
    oneLevel: "用户中心",
    twoList: [
      {
        twoLevel: "机构管理",
        threeList: [
          {
            threeLevel: "成员和部门",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
          {
            threeLevel: "角色管理",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
          {
            threeLevel: "岗位管理",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
        ],
      },
      {
        twoLevel: "组织管理",
        threeList: [
          {
            threeLevel: "成员和部门2",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
          {
            threeLevel: "角色管理2",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
          {
            threeLevel: "岗位管理2",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    oneLevel: "一级菜单",
    twoList: [
      {
        twoLevel: "二级菜单1",
        threeList: [
          {
            threeLevel: "成员和部门",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
          {
            threeLevel: "角色管理",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
          {
            threeLevel: "岗位管理",
            fourList: [{ name: "查看" }, { name: "添加" }, { name: "删除" }],
          },
        ],
      },
    ],
  },
]);

// 一级选中
const oneChange = (value: boolean, oneItem: any) => {
  oneItem["twoList"].forEach((item: any) => {
    item["isCheck"] = value; // 设置二级选中状态
    item.threeList.forEach((ele: any) => {
      ele["isCheck"] = value; // 设置三级选中状态
      ele.fourList.forEach((k: any) => {
        k["isCheck"] = value; // 设置四级选中状态
      });
    });
  });
};
// 二级选中
const twoChange = (value: boolean, twoItem: any, oneIndex: number) => {
  twoItem["threeList"].forEach((item: any) => {
    item["isCheck"] = value; // 设置三级选中状态
    item.fourList.forEach((ele: any) => {
      ele["isCheck"] = value; // 设置四选中状态
    });
  });
};
// 三级选中
const threeChange = (value: boolean, threeItem: any) => {
  threeItem.fourList.forEach((ele: any) => {
    ele["isCheck"] = value; // 设置四选中状态
  });
};
// 四级选中
const fourChange = (value: boolean, threeItem: any, twoItem: any, oneItem: any) => {};

const getState = () => {};
</script>
<template>
  <!-- <el-scrollbar height="400px"> -->
  <div class="custom-table">
    <!-- 一级分类 -->
    <div class="one-item" v-for="(oneItem, index) in tableData" :key="index">
      <div class="one-cell">
        <el-checkbox
          v-model="oneItem.isCheck"
          :label="oneItem.oneLevel"
          :indeterminate="oneItem.halfCheck"
          @change="oneChange($event, oneItem)"
        ></el-checkbox>
      </div>
      <div class="two-wrap">
        <!-- 二级分类 -->
        <div
          class="two-item"
          v-for="(twoItem, twoIndex) in oneItem.twoList"
          :key="twoIndex"
        >
          <div class="two-cell">
            <el-checkbox
              v-model="twoItem.isCheck"
              :label="twoItem.twoLevel"
              :indeterminate="twoItem.halfCheck"
              @change="twoChange($event, twoItem, index)"
            ></el-checkbox>
          </div>
          <div class="three-wrap">
            <!-- 三级分类 -->
            <div
              class="three-item"
              v-for="(threeItem, threeIndex) in twoItem.threeList"
              :key="threeIndex"
            >
              <div class="three-cell">
                <el-checkbox
                  v-model="threeItem.isCheck"
                  :label="threeItem.threeLevel"
                  :indeterminate="threeItem.halfCheck"
                  @change="threeChange($event, threeItem)"
                ></el-checkbox>
              </div>
              <div class="four-wrap">
                <!-- 四级分类 -->
                <div
                  class="four-item"
                  v-for="(fourItem, fourIndex) in threeItem.fourList"
                  :key="fourIndex"
                >
                  <div class="four-cell">
                    <el-checkbox
                      v-model="fourItem.isCheck"
                      :label="fourItem.name"
                      :indeterminate="fourItem.halfCheck"
                      @change="fourChange($event, threeItem, twoItem, oneItem)"
                    ></el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </el-scrollbar> -->
</template>

<style lang="scss" scoped>
.custom-table {
  margin: 20px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.one-item,
.two-item,
.three-item,
.four-wrap {
  display: flex;
  line-height: 40px;
}

.one-cell,
.two-cell,
.three-cell {
  min-width: 120px;
  padding-left: 10px;
}

.two-wrap,
.three-wrap,
.four-wrap {
  flex: 1;
}
.four-wrap {
  .four-cell {
    margin: 0 10px;
  }
}
.one-cell,
.three-cell {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.one-cell,
.two-cell,
.three-item {
  border-bottom: 1px solid #ccc;
}

.one-cell,
.two-cell {
  display: flex;
  align-items: center;
}
</style>
