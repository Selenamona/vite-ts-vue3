<!-- 4位随机验证码-图片-->
<template>
  <div class="verify">
    <vue-img-verify ref="verifyRef" />
  </div>
</template>

<script lang="ts">
import vueImgVerify from "../../components/mobile/VueImageVerify.vue";
export default {
  name: "verify",
  components: { vueImgVerify }
};
</script>
<style lang="scss" scoped></style>
