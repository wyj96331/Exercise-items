import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'
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
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: {
      show: true
    }
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: {
      show: true
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: {
      show: true
    }
  },
  {
    path: '/center',
    redirect: '/center/myorder',
    component: () => import('@/views/Center'),
    meta: {
      show: true
    },
    // 二级路由
    children: [
      {
        path: 'myorder',
        component: () => import('@/views/Center/MyOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/views/Center/GroupOrder')
      }
    ]
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

// 全局守卫:前置守卫(再路由跳转之前判断)
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    // 登录
    if (to.path === '/login') {
      // 因为已经登录所以不能去login给它强制专跳到home
      Message.warning('您已经登录')
      next('/home')
    } else {
      // 登录了 转跳其他路由 却没有用户信息 这里要重新获取用户信息
      // 获取用户信息
      if (name) {
        next()
      } else {
        await store.dispatch('getUserInfo').then(
          resolve => {
            next()
          }, reject => {
            // token失效，退出登录，清除本地数据
            store.dispatch('userLoguot')
            Message.error('token失效请重新登录')
            next('/login')
          })

        next()
      }
    }
  } else {
    // 未登录
    if (to.path === '/trade') {
      next('/login')
      Message.error('请登录您的账号')
      Message.error('token失效请重新登录')
    }
    next()
  }
})
export default router
