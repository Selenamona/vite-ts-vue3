<template>
  <!-- sizes and positions -->
  <div class="p-5px mt-[0.3px] text-cyan-400">
    p-5px mt-[0.3px] 设置 padding 和 margin；
  </div>
  <div class="p-0.2 m-0.1rem bg-$test-variable">
    p-2 m-0.1rem 【不带单位默认{number/4}rem】
  </div>
  <!-- colors -->
  <div :class="active ? 'text-green-600' : 'text-orange-400'">
    text-cyan-400/text-green-600 设置文字颜色（border-hex-ff1100 设置边框颜色）
  </div>
  <button class="bg-hex-b2a8bb">bg-hex-b2a8bb 设置背景颜色</button>
  <button class="bg-[hsl(211.7,81.9%,69.6%)]">
    bg-[hsl(211.7,81.9%,69.6%)] 设置背景颜色
  </button>
  <!-- grid template -->
  <div class="grid-cols-[auto,1fr,30px]">
    <div class="w-9/12 bg-hex-ff1100">w-9/12 宽度设置百分比</div>
  </div>
  <div class="$btn $btn-green">按钮 shortcuts</div>
</template>

<script setup lang="ts">
const active = true;
</script>

<style lang="scss">
// --test-variable: "red";
</style>
