import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 登录页
import Login from '@/views/Login.vue'

import List from '../components/list.vue' // 列表组件

import Release from '../components/Release.vue'
// Home 组件页
import Container from '../components/container.vue'

import Breadcrumbs from '../components/breadcrumbs.vue'

// 上传图片组件
import Upload from '../components/Upload.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'*',
    redirect:'/index'
  },
  {
    // 主页
    path: '/index',
    component:Home,
    name: 'Home',
    meta:{
      breadcrumbs:'后台首页'
    },
    children: [{                //当前路由下的子路由
          path: '/index/list',
          component: ()=>import("../components/list.vue"),
          meta:{
            breadcrumbs:'文章列表'
          },
          hidden: true,              //是否隐藏
        },
        {
          path:'/index/release',
          name:'Release',
          meta:{
            breadcrumbs:'文章编辑'
          },
          component:()=>import("../components/Release.vue")
        },
       


        {
          path: '/container',
          name:'Container',
          component: Container
        },
        {
          path:'/breadcrumbs',
          name:'Breadcrumbs',
          component:Breadcrumbs
        },
        {
          path:'/upload',
          name:'Upload',
          component:Upload
        },
    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
