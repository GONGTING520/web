import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  add (state, num) {
    state.count += num
    return state.count
  },
  reduce (state) {
    return state.count--
  }
}

// 相当于计算属性
const getters = {
  gettersAdd (state) {
    console.log('gettersAdd   +10')
    state.count += 10
    return state.count
  }
}

const actions = {
  addActions ({
    commit
  }) {
    console.log('addActions  +1')
    commit('add', 1)
  },
  reduceActions ({
    commit
  }) {
    console.log('reduceActions')
    commit('reduce')
  }
}

// const moduleA = {
//   state,
//   mutations,
//   getters,
//   actions
// }

// export default new Vuex.Store({
//   modules: {
//     a: moduleA
//   }
// })

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
