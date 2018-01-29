<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/test">主路由test</router-link>
      <router-link :to="{name:'test1', params:{username:'gongting', age:18}}">子路由test1传对象</router-link>
      <router-link to="/test/test2/6/zhangsan">子路由test2传URL</router-link>
      <router-link to="/home">重定位</router-link>
      <router-link to="/abc">alias</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
