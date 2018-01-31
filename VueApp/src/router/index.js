import Vue from 'vue';
import Router from 'vue-router';
import Movie from '@/components/movie/Movie';
import Music from '@/components/music/Music';
import Book from '@/components/book/Book';
import Photo from '@/components/photo/Photo';

Vue.use(Router);
global.API_PROXY = 'https://bird.ioliu.cn/v2/?url=';

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'movie',
    component: Movie,
  }, {
    path: '/music',
    name: 'music',
    component: Music,
    beforeEnter (to, from, next) {
      // 如果是刷新来的就改成首页，否则就正常跳转
      from.name === null ? next('/') : next();
    }
  }, {
    path: '/book',
    name: 'book',
    component: Book,
    beforeEnter (to, from, next) {
      from.name === null ? next('/') : next();
    }
  }, {
    path: '/photo',
    name: 'photo',
    component: Photo,
    beforeEnter (to, from, next) {
      from.name === null ? next('/') : next();
    }
  }, ],
});
