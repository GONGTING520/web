<template>
  <div>
    <h1>{{ $store.state.count }}</h1>
    <!-- <h1>{{ $store.state.a.count }}</h1> -->
    <!-- <h1>{{ computedCount }}</h1> -->
    <h1>count {{ count }}</h1>
    <!-- <h1>count {{ a.count }}</h1> -->
    <h1>gettersAdd {{ gettersAdd }}</h1>
    <button @click="$store.commit('add', 2)">add 2</button>
    <button @click="$store.commit('reduce')">reduce</button>
    <button @click="add(2)">mutations add</button>
    <button @click="reduce">mutations reduce</button>
    <button @click="addActions">actions add</button>
    <button @click="reduceActions">actions reduce</button>
    <button @click="dis">dispatch add</button>
  </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
  store,
  //   computed: {
  //     computedCount () {
  //       return this.$store.state.count
  //     }
  //   },
  //   computed: mapState({
  //     computedCount: state => state.count
  //   }),
  computed: {
    ...mapState(['count']),
    // ...mapState({
    //   a: state => state.a
    // }),
    ...mapGetters(['gettersAdd'])
  },
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addActions', 'reduceActions']),
    dis () {
      return this.$store.dispatch('addActions')
    }
  }
}
</script>
