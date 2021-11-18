<!--  -->
<template>
  <div class="Search">
    <img class="icon" src="/@/assets/mobile/search.png" alt="" />
    <div class="wrap">
      <input type="search" @input="" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Search",
  props: { placeholder: { type: String } },
};
</script>
<style lang="scss" scoped>
.Search {
  background: #393b44;
  border-radius: 0.18rem;
  display: flex;
  align-items: center;
  height: 0.36rem;
  padding: 0 0.15rem;
  margin: 0.16rem 0.15rem;

  .icon {
    width: 0.2rem;
    height: 0.2rem;
    flex-shrink: 0;
    margin-right: 0.12rem;
  }

  .wrap {
    flex: 1;
    height: 0.36rem;
    font-size: 0.13rem;
    color: #fff;
  }

  input {
    background: #393b44;
    height: 100%;
    width: 100%;

    &::placeholder {
      font-size: 0.13rem;
      color: #8d8d91;
    }
  }
}
</style>
