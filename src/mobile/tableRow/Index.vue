<!-- table-row 封装 -->
<template></template>
<script setup lang="ts">
const source = [
  { name: '渠道', type: '0', value: '', code: '' },
  { name: '渠道编号', type: '2', value: '', code: '', isShow: false },
  { name: '金融产品', type: '0', value: '', code: '' },
  { name: '主体', type: '0', value: '', code: '', isShow: false }, //【ID1014214】预审去除选择主体
  { name: '所选车型', type: '0', value: '', code: '' },
  { name: '金融顾问', type: '0', value: '', code: '', isShow: false },
  { name: '第三方订单号', type: '1', value: '', code: '', isShow: false, iptPlaceholder: '请输入第三方订单号' },
  { name: '预审方式', type: '2', value: '', code: '' }
]
</script>

<style lang='scss' scoped>
</style>
