<template>
  <div class="header" :style="{backgroundColor: bgColor}">
    <span @click="$emit('tapLi')">
      <router-link to="/" class="home" :style="{backgroundColor: bgColor}">首页</router-link>
    </span>
    <span class="title">
      <slot>default</slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ["bgColor"]
};
</script>

<style scoped>
.header {
  height: 1rem;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  line-height: 1rem;
  color: #ffffff;
}
.home {
  color: #ffffff;
  margin-left: 0.2rem;
  font-size: 0.3rem;
  outline: none;
}
.title {
  font-size: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
