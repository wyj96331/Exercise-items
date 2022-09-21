import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 先把VueRouter原型对象保存
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数：告诉push方法，你往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}
const routes = [
  { // 路由重定向
    path: '/',
    component: () => import('@/views/Home'),
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      show: true
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/ShopCart'),
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: {
      show: true
    }
  },
  {
    path: '/detail/:skuid',
    component: () => import('@/views/Detail'),
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      show: false
    }
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      show: false
    }
  },
  {
    path: '/search/:keyword',
    component: () => import('@/views/Search'),
    meta: {
      show: true
    },
    name: 'search'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 返回 y = 0 代表滚动条在最上方
    return { y: 0 }
  }
})

export default router
