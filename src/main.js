import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elementUI
import '@/elementUI'
// 引入MockServe.js-----模拟数据
import '@/mock/mockServe'
// 引入swiper样式文件
import 'swiper/css/swiper.css'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import PaginationTwo from '@/components/PaginationTwo'
// 第一个参数：全局组件的名字。第二参数：是哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(PaginationTwo.name, PaginationTwo)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
