// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/js/rem';
import './assets/css/reset.css';
import './assets/css/iconfont.css';
import VueTouch from 'vue-touch';

Vue.config.productionTip = false;
Vue.use(VueTouch, {
  name: 'v-touch'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
});
