<template>
    <div>
        <h1>主路由test</h1>
        <h1 v-text="msg"></h1>
        <router-view />
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'test component'
    }
  }
}
</script>

<style scoped>
h1 {
  color: aqua;
}
</style>
