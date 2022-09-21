<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口文件 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted () {
    // App根组件挂载就获取一次后台数据
    this.$store.dispatch('getCategoryList')
  }
}
</script>
<style lang="less">
</style>
