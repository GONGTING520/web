<template>
  <div>
      <h1>子路由test1传对象</h1>
      <h1 v-text="$route.params.username"></h1>
      <h1 v-text="$route.params.age"></h1>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
