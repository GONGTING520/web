import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test.vue'
import Test1 from '@/components/Test1.vue'
import Test2 from '@/components/Test2.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/test',
    name: 'test',
    alias: '/abc',
    component: Test,
    children: [{
      path: '/test/test1',
      component: Test1,
      name: 'test1'
    },
    {
      // 用括号限制传参格式，参数一一对应
      path: '/test/test2/:userId(\\d+)/:username',
      component: Test2,
      name: 'test2'
    }
    ]
  },
  {
    path: '/home',
    redirect: '/'
  }
  ]
})
