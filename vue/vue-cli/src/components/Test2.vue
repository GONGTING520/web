<template>
  <div>
    <h1>子路由test2传URL</h1>
    <h1>{{ $route.params.userId }}</h1>
    <h1>{{ $route.params.username }}</h1>
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
