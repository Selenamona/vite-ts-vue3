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
const twoChange = (value: boolean, twoItem: any, oneItem: any) => {
  twoItem["threeList"].forEach((item: any) => {
    item["isCheck"] = value; // 设置三级选中状态
    item.fourList.forEach((ele: any) => {
      ele["isCheck"] = value; // 设置四选中状态
    });
  });
  getState(oneItem, "twoList"); // 设置一级选中状态
};
// 三级选中
const threeChange = (value: boolean, threeItem: any, twoItem: any, oneItem: any) => {
  threeItem.fourList.forEach((ele: any) => {
    ele["isCheck"] = value; // 设置四选中状态
  });
  getState(twoItem, "threeList"); // 设置二级选中状态
  getState(oneItem, "twoList"); // 设置一级选中状态
};
// 四级选中
const fourChange = (threeItem: any, twoItem: any, oneItem: any) => {
  getState(threeItem, "fourList"); // 设置三级选中状态
  getState(twoItem, "threeList"); // 设置二级选中状态
  getState(oneItem, "twoList"); // 设置一级选中状态
};

// 判断选中状态
const getState = (item: any, key: string) => {
  let hasChecked = false,
    hasEmpty = false;
  for (let i = 0; i < item[key].length; i++) {
    const element: any = item[key][i];
    if (element.halfCheck) {
      item.halfCheck = true; // 子级半选，父级肯定半选
      return;
    }
    element.isCheck ? (hasChecked = true) : (hasEmpty = true);
    if (hasChecked && hasEmpty) {
      item.halfCheck = true; // 半选
      return;
    }
  }
  item.halfCheck = false; // 取消半选
  item.isCheck = hasChecked ? true : false; // 全选/未选
};
</script>
<template>
  <!-- <el-scrollbar height="400px"> -->
  <div class="custom-table">
    <div class="one-item">
      <p class="one-cell">一级菜单</p>
      <div class="two-wrap">
        <div class="two-item">
          <p class="two-cell">二级菜单</p>
          <div class="three-wrap">
            <div class="three-item">
              <p class="three-cell">三级菜单</p>
              <div class="four-item">
                <p class="four-cell">四级菜单</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              @change="twoChange($event, twoItem, oneItem)"
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
                  @change="threeChange($event, threeItem, twoItem, oneItem)"
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
                      @change="fourChange(threeItem, twoItem, oneItem)"
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
}
.one-cell,
.two-cell,
.three-cell,
.four-cell {
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
}

.two-wrap,
.three-wrap,
.four-wrap {
  flex: 1;
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
