import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Main from '@/components/Main'
import Home from '@/components/Home'

import Wapper from '@/components/Wapper.vue'
import PageOptionsWapper from '@/components/PageOptionsWapper.vue'
import PageContainerWapper from '@/components/PageContainerWapper.vue'
import PageWapper from '@/components/PageWapper.vue'

import user from '@/components/user/User'
import DroneComment from '@/components/drone/DroneComment'
import Drone from '@/components/drone/Drone'
import Generation from '@/components/generations/Generations'
import Weibo from '@/components/weibo/Weibo'
import Comment from '@/components/weibo/Comment'
import Share from '@/components/share/Share'
import Picture from '@/components/picture/Picture'
import ThirdPlatform from '@/components/setting/ThirdPlatform'
import Credit from '@/components/credit/credit'
import payRecord from '@/components/credit/PayRecord'
import cardGather from '@/components/credit/cardGather'

const menuList = [
  {
    path: '/Home',
    name: '首页',
    icon: 'el-icon-s-home',
    component: Home
  },
  {
    path: '/setting',
    name: '设置',
    icon: 'el-icon-setting',
    component: Wapper,
    children: [
      {
        path: 'thirdPlatform',
        name: '第三方登录平台',
        component: ThirdPlatform,
      }]
  },{
    path: '/user',
    name: '用户',
    icon: 'el-icon-user',
    component: Wapper,
    children: [
      {
        path: 'user',
        name: '用户列表',
        component: user
      }]
  },
  {
    path: '/drone',
    name: '无人机',
    icon: 'el-icon-position',
    component: Wapper,
    children: [
      {
        path: 'DroneComment',
        name: '评论列表',
        component: DroneComment
      },
      {
        path: 'Drone',
        name: '作品列表',
        component: Drone
      }
    ]
  },
  {
    path: '/Generations',
    name: '族谱',
    icon: 'el-icon-s-grid',
    component: Wapper,
    children: [
      {
        path: 'Generations',
        name: '族谱列表',
        component: Generation
      }]
  },
  {
    path: '/weibo',
    name: '微博',
    icon: 'el-icon-film',
    component: Wapper,
    children: [
      {
        path: 'weibo',
        name: '微博列表',
        component: Weibo
      },
      {
        path: 'comment',
        name: '评论列表',
        component: Comment
      }]
  },
  {
    path: '/share',
    name: '分享',
    icon: 'el-icon-share',
    component: Wapper,
    children: [
      {
        path: 'share',
        name: '分享列表',
        component: Share
      }]
  },
  {
    path: '/picture',
    name: '图片资源',
    icon: 'el-icon-picture',
    component: Wapper,
    children: [
      {
        path: 'picture',
        name: '图片列表',
        component: Picture
      }]
  },
  {
    path: '/credit',
    name: '信用卡管理',
    icon: 'el-icon-bank-card',
    component: Wapper,
    children: [
      {
        path: 'credit',
        name: '信用卡管理',
        component: Credit
      },
      {
        path: 'payRecord',
        name: '付款记录',
        component: payRecord
      },
      {
        path: 'cardGather',
        name: '汇总',
        component: cardGather
      }]
  },
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
  base:'backup',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: '入口',
      component: Main,
      children: menuList
    }

  ]
})
