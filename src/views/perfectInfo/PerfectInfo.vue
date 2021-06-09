<template>
  <div class="perfect-info">
    <div class="item">
      <div class="title">姓名</div>
      <div class="value">
        <input type="text" />
      </div>
    </div>
    <div class="item">
      <div class="title">手机号</div>
      <div class="value">
        <input type="text" />
      </div>
    </div>
    <div class="item">
      <div class="title">验证码</div>
      <div class="value">
        <input type="text" />
        <button>获取验证码</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup(props) {
    console.log("🚀  ~ props", props);
  }
});
</script>
