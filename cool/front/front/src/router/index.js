import Vue from 'vue'
import Router from 'vue-router'

import Wapper from '@/components/Wapper.vue'
import PageOptionsWapper from '@/components/PageOptionsWapper.vue'
import PageContainerWapper from '@/components/PageContainerWapper.vue'
import PageWapper from '@/components/PageWapper.vue'

import Main from '@/components/Main'
import Index from '@/components/Index'
import Login from '@/components/Login'


import Generations from '@/components/generations/Generations'
import About from '@/components/about/About'
import Weibo from '@/components/weibo/Weibo'
import Drone from '@/components/drone/Drone'
import Share from '@/components/share/Share'
import Fate from '@/components/fate/fate'
import SinaCallBack from "@/components/SinaCallBack";

const menuList = [
  {
    path: '',
    name: '',
    icon: 'el-icon-menu',
    component: Wapper,
    children: [
      {
        path: 'index',
        name: '首页',
        component: Index
      },
      {
        path: 'generations',
        name: '族谱',
        component: Generations
      },
      {
        path: 'weibo',
        name: '吹水区',
        component: Weibo,

      },
      {
        path: 'drone',
        name: '无人机',
        component: Drone
      },
      {
        path: 'share',
        name: '资源分享',
        component: Share
      },
      {
        path: 'fate',
        name: '八字',
        component: Fate
      },
      {
        path: 'about',
        name: '关于',
        component: About
      }]
  }
]
menuList.forEach((router) => {
  router.meta = {}
  router.meta.routeList = [router.name]
  if (router.children) {
    router.children.forEach((childrenRouter) => {
      childrenRouter.meta = {}
      childrenRouter.meta.routeList = [router.name, childrenRouter.name]
    })
  }
})


Vue.use(Router)

Vue.component('Wapper', Wapper)
Vue.component('PageOptionsWapper', PageOptionsWapper)
Vue.component('PageContainerWapper', PageContainerWapper)
Vue.component('PageWapper', PageWapper)

export default new Router({
  base:'/cool/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: menuList
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/callback',
      name: 'callback',
      component: SinaCallBack,
    },
    {
      path: '/drone',
      name: 'drone',
      component: Drone,
    },
  ]
})
