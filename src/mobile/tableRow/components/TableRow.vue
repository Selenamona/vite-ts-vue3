<!--
type：数据输入类型(0选择，1输入，2只读，3拍照，4开关, 5输入+拍照,6标题 )
value: 如果是开关，true开关-开，false开关-关
remarks：Cell备注信息
limitmax：输入时字数限制，如果没有设置，默认500字符
iptPlaceholder：默认显示提示，如果没有则为请输入
noDelete： 输入是否显示右侧删除图标，默认显示
isShow: 是否显示当前行，默认true，显示
tag: 判断显示标签：1 => input； 默认显示 textarea
tagType： 当tag为 input 时，input的type属性（增加input的作用：可以调用数字键盘）
limitType: 默认不限制，1 限制数字 2 限制数字和字母

requireds: 显示非必填字段（暂时还未用到）

右侧的展示增加slot字段，可自行添加特殊需要展示的内容
-->
<template>
  <div class="table-common-wrap">
    <div
      :class="[item.type === '6' ? 'table-common-row grayBackColor' : 'table-common-row', 'table-common-row' + idx]"
      v-for="(item,idx) in source"
      :key="idx"
    >
      <div class="row-item row-item-title" v-if="item.type === '6'">{{ item.title }}</div>
      <!--输入-->
      <div
        class="row-item ipt-item"
        v-if="item.type === '1'"
        v-show="item.isShow !== undefined ? item.isShow : true"
      >
        <div class="left">{{ item.name }}</div>
        <textarea
          v-if="item.tag !== '1'"
          v-model="item.value"
          :id="'textarea' + idx"
          :placeholder="item.iptPlaceholder || '请输入'"
          :maxlength="item.limitmax || 500"
          class="right"
          :class="{ showTip: item.value && !item.noDelete }"
        ></textarea>
        <input
          v-if="item.tag == '1'"
          :type="item.tagType"
          v-model="item.value"
          @input="inputChange(item.limitType, item.value, idx, item.belong)"
          :placeholder="item.iptPlaceholder || '请输入'"
          :maxlength="item.limitmax || 500"
          class="right"
          :class="{ showTip: item.value && !item.noDelete }"
          @blur="inputBlur"
          autocomplete="off"
        />
        <div
          v-if="item.value && !item.noDelete"
          class="clear-btn"
          @click="clearItem(idx, 'textarea' + idx)"
        ></div>
        <slot :name="'right' + idx"></slot>
      </div>
      <!--选择-->
      <div
        class="row-item select-item"
        v-if="item.type === '0'"
        v-show="item.isShow !== undefined ? item.isShow : true"
      >
        <div class="left">{{ item.name }}</div>
        <div class="right" @click="toSelect(item, idx)" :class="{ placeholderCol: !item.value }">
          {{ item.value || (item.iptPlaceholder || '请选择') }}
          <slot :name="'right' + idx"></slot>
        </div>
      </div>
      <!--静态-->
      <div
        class="row-item static-item"
        v-if="item.type === '2'"
        v-show="item.isShow !== undefined ? item.isShow : true"
      >
        <div class="left">{{ item.name }}</div>
        <div class="right">
          {{ item.value }}
          <slot :name="'right' + idx"></slot>
        </div>
      </div>
      <!--输入且右侧带图标，从相册选择-->
      <div
        class="row-item ipt-item"
        v-if="item.type === '3'"
        v-show="item.isShow !== undefined ? item.isShow : true"
      >
        <div class="left">{{ item.name }}</div>
        <input
          :type="item.tagType"
          v-model="item.value"
          :placeholder="item.iptPlaceholder"
          class="right has-icon"
        />
        <img :src="item.imgSrc" alt class="scanImg upload-btn" />
        <input
          type="file"
          accept="image/*"
          class="upload-btn"
          @change="chooseImg(item, idx)"
          :id="'file' + idx"
          :capture="isAndrQQ ? 'camera' : false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
const state = reactive({
  // 输入模块使用的变量
  isFirefox: false, // 输入框的兼容性变量
  isOpera: false, // 输入框的兼容性变量
  addEvent: null, // 输入框的监听
  isAndrQQ: false, // 是否是Android端的qq浏览器(因为在qq内置浏览器中: 没有调用摄像头的选项)
}
})

const props = defineProps({
  source: Array
})

onMounted(() => {
  let androidReq = /(Android)/i.test(navigator.userAgent);
  this.isAndrQQ = window.browser.versions.qq && androidReq && !browser.versions.weixin;
  setTimeout(() => {
    this.isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window;
    this.isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera');
  }, 0)
})
// 解决键盘弹起，页面上移
const inputBlur = () => {
  setTimeout(() => {
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
},
  // 输入类型判断
  coonst inputChange = (limitType, value, idx, parentKey) => {
    parentKey = parentKey || "source";
    if (limitType == 1) { // only number 
      this.$parent[parentKey][idx].value = value.replace(/[^\d]/g, '');
    } else if (limitType == 2) { // number and letters
      this.$parent[parentKey][idx].value = value.replace(/[\W]/g, '');
    }
  }
// 改变输入框中的内容
const change = (elem, maxHeight, extra) => {
  extra = extra || 0;
  var scrollTop, height, padding = 0,
    style = elem.style;
  if (elem._length === elem.value.length) return;
  elem._length = elem.value.length;

  if (!this.isFirefox && !this.isOpera) {
    padding = parseInt(this.getStyle('paddingTop', elem)) + parseInt(this.getStyle('paddingBottom', elem));
  };
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

  elem.style.height = this.minHeight + 'px';
  if (elem.scrollHeight > this.minHeight) {
    if (maxHeight && elem.scrollHeight > maxHeight) {
      height = maxHeight - padding;
      style.overflowY = 'auto';
    } else {
      height = elem.scrollHeight - padding;
      style.overflowY = 'hidden';
    };
    style.height = height + extra + 'px';
    scrollTop += parseInt(style.height) - elem.currHeight;
    document.body.scrollTop = scrollTop;
    document.documentElement.scrollTop = scrollTop;
    elem.currHeight = parseInt(style.height);
  }
}

// 获取输入框高度
const getStyle = (name, elem) => {
  if (elem.currentStyle) {
    var val = elem.currentStyle[name];

    if (name === 'height' && val.search(/px/i) !== 1) {
      var rect = elem.getBoundingClientRect();
      return rect.bottom - rect.top -
        parseFloat(this.getStyle('paddingTop', elem)) -
        parseFloat(this.getStyle('paddingBottom', elem)) + 'rem';
    };

    return val;
  } else {
    return getComputedStyle(elem, null)[name];
  }
}

/**
 *
 * @param elem  输入框元素
 * @param extra 设置光标与输入框保持的距离(默认0)
 * @param maxHeight 设置最大高度(可选)
 */
const autoTextarea = (elem, extra, maxHeight) => {
  this.addEvent = function (type, callback) {
    elem.addEventListener ?
      elem.addEventListener(type, callback, false) :
      elem.attachEvent('on' + type, callback);
  };
  elem.style.resize = 'none';
  elem.setAttribute('hasEvent', true); // 判断该dom是否绑定了事件
  this.addEvent('propertychange', () => { this.change(elem, maxHeight) });
  this.addEvent('input', () => { this.change(elem, maxHeight) });
  this.addEvent('focus', () => { this.change(elem, maxHeight) });
  this.change(elem, maxHeight);
}

// 清除输入框内容
const clearItem = (idx, elemId) => {
  this.$emit('clearItem', idx);
  this.$nextTick(() => {
    let elem = document.getElementById(elemId);
    this.change(elem);
  })
},

  // 点击选择模块
  toSelect(item, idx) {
    this.$emit('toSelect', item, idx)
  },
    // 从相册选择
    chooseImg(item, idx) {
  let e = event || window.event;
  this.uploadImg(e.target.files[0], (rst) => {
    this.$emit('chooseImg', item, idx, rst)
    // 清空input，防止同一张图片上传不触发change事件
    document.querySelector('#file' + idx).value = '';
  })
}
},

watch: {
  source: {
    handler: function (newVal) {
      newVal.forEach((item, index) => {
        if (item.type === '1' && item.tag !== '1') {
          this.$nextTick(() => {
            let elem = document.getElementById('textarea' + index);
            if (!this.minHeight) {
              this.minHeight = parseFloat(this.getStyle('height', elem));
            }
            if (elem.getAttribute('hasEvent')) {
              this.change(elem);
            } else {
              this.autoTextarea(elem);
            }
          })
        }
      })
    },
    deep: true //深度监听
  }
}
}
</script>

<style lang="scss" scoped>
// tableRowInfo 组件预审3.0样式
.table-common-wrap {
  .table-common-row {
    padding: 0 0.15rem;
    color: #090932;

    .row-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      padding: 0.16rem 0;
      position: relative;
      line-height: 0.24rem;

      .left {
        font-size: 0.14rem;
        font-weight: bold;
        line-height: 0.22rem;
      }

      /*输入、选择右侧的字*/
      .right {
        width: 2.5rem;
        font-size: 0.14rem;
        text-align: right;
      }

      .has-icon {
        margin-right: 0.28rem;
      }

      textarea,
      input {
        display: block;
        overflow: hidden;
        height: 0.24rem;
        line-height: 0.24rem;
      }

      .clear-btn {
        width: 0.16rem;
        height: 100%;
        background: url(../../assets/images/icon_close.png) no-repeat right
          center;
        background-size: 0.16rem 0.16rem;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .showTip {
        padding-right: 0.26rem;
      }

      textarea::-webkit-input-placeholder,
      input::-webkit-input-placeholder,
      .placeholderCol {
        color: #cfcfcf;
        font-size: 0.14rem;
        font-weight: normal;
      }

      .upload-btn.scanImg {
        opacity: 1;
      }

      .upload-btn {
        position: absolute;
        right: 0;
        width: 0.18rem;
        height: 0.18rem;
        opacity: 0;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        padding: 0.05rem 0 0.05rem 0.05rem;
        box-sizing: content-box;
      }
    }

    .row-item-title {
      font-size: 0.14rem;
      font-weight: 600;
      color: #2e2e2e;
      height: 0.35rem;
      display: flex;
      align-items: center;
    }

    .select-item {
      padding-right: 0.19rem;
      background: url(../../assets/images/arrow_right.png) no-repeat right
        center;
      background-size: 0.07rem 0.12rem;
    }

    /*静态右侧的字*/
    .static-item {
      position: relative;

      .right {
        color: #6e727a;
      }
    }
  }

  .grayBackColor {
    background: #f8f8fa;
  }
}
</style>
