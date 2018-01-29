<template>
    <div>
        <h1>主路由test</h1>
        <h1 v-text="msg"></h1>
        <transition name="fade">
          <router-view />
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'test component'
    }
  },
  beforeRouteEnter: (to, from, next) => {
    console.log(to)
    console.log(from)
    next()
    // next(false)
  },
  beforeRouteLeave: (to, from, next) => {
    console.log('route leave')
    next()
  }
}
</script>

<style scoped>
h1 {
  color: aqua;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity .5s ease;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity .5s ease;
}
</style>
