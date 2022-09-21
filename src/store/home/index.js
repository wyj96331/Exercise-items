import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
// home 模块仓库
export default {
  state: {
    categoryList: [], // 三级联动列表数据
    bannerList: [], // 轮播图数据
    floorList: [] // floor数据
  },
  mutations: {
    CATEGORTLIST (state, categoryList) {
      state.categoryList = categoryList
    },
    GETBANNERLIST (state, bannerList) {
      state.bannerList = bannerList
    },
    GETFLOORLIST (state, floorList) {
      state.floorList = floorList
    }
  },
  actions: {
    // 获取三级联动列表数据
    async getCategoryList (store) {
      const { data: res } = await reqCategoryList()
      if (res.code === 200) {
        store.commit('CATEGORTLIST', res.data)
      }
    },
    // 获取首页轮播图数据
    async getBannerList (store) {
      const { data: res } = await reqGetBannerList()
      if (res.code === 200) {
        store.commit('GETBANNERLIST', res.data)
      }
    },
    // 获取floor数据
    async getFloorList (store) {
      const res = await reqGetFloorList()
      if (res.data.code === 200) {
        store.commit('GETFLOORLIST', res.data.data)
      }
    }
  },
  getters: {}
}
