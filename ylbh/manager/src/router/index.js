import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import Setting from '@/components/setting/MenuSetting.vue'

import Hello from '@/components/hello.vue'
import HardList from '@/components/HardPromo/list.vue'
import Wapper from '@/components/Wapper.vue'
import PageOptionsWapper from '@/components/PageOptionsWapper.vue'
import PageContainerWapper from '@/components/PageContainerWapper.vue'
import PageWapper from '@/components/PageWapper.vue'

let menuList =
  [
    /*{
      path: '/hard',
      name: '首页',
      icon: 'el-icon-s-home',
      component: Wapper,
      children:[{
        path: 'list',
        name: '首页',
        component: HardList
      }]
    }*/]
/*menuList.forEach((router) => {
  router.meta = {}
  router.meta.routeList = [router.name]
  if (router.children) {
    router.children.forEach((childrenRouter) => {
      childrenRouter.meta = {}
      childrenRouter.meta.routeList = [router.name, childrenRouter.name]
    })
  }
})*/


Vue.use(Router)

Vue.component('Wapper', Wapper)
Vue.component('PageOptionsWapper', PageOptionsWapper)
Vue.component('PageContainerWapper', PageContainerWapper)
Vue.component('PageWapper', PageWapper)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: '入口',
      component: Main,
      //children: menuList
    }
  ]
})
