import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  photoList: []
};
const mutations = {
  setPhoto(state, status) {
    state.photoList = status;
  }
};
const getters = {};
const actions = {
  setPhotoList({
    commit
  }, status) {
    commit('setPhoto', status);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
