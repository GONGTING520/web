<template>
  <ul class="footer" :style="{backgroundColor: bgColor}">
    <li @click="$emit('tapLi', 'anime')">
      <router-link to="/">动漫</router-link>
    </li>
    <li @click="$emit('tapLi', 'movie')">
      <router-link to="/movie">电影</router-link>
    </li>
    <li @click="$emit('tapLi', 'music')">
      <router-link to="/music">音乐</router-link>
    </li>
    <!-- <li @click="$emit('tapLi', 'book')">
      <router-link to="/book">书籍</router-link>
    </li>
    <li @click="$emit('tapLi', 'photo')">
      <router-link to="/photo">图片</router-link>
    </li> -->
  </ul>
</template>

<script>
export default {
  props: ["bgColor"]
};
</script>

<style scoped>
.footer {
  display: flex;
  position: fixed;
  z-index: 10;
  bottom: 0;
  height: 1rem;
  width: 100%;
  line-height: 1rem;
}
.footer li {
  flex-grow: 1;
  text-align: center;
}
.footer li a {
  color: #cccccc;
  font-size: 0.3rem;
  display: block;
  outline: none;
}
.footer li a.router-link-exact-active {
  color: #ffffff;
}
</style>
