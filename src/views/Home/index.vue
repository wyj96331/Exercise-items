<template>
  <div>
    <!-- 三级联动组件-全局组件 -->
    <TypeNav />
    <!-- 局部组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="index" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
export default {
  name: 'MyHome',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted () {
    // 获取首页商品信息
    this.$store.dispatch('getFloorList')
    // 获取用户信息
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style>
</style>
