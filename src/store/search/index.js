// search 模块仓库
import { reqGetSearchInfo } from '@/api'
export default {
  state: {
    searchList: {}// 搜索列表
  },
  getters: {
    goodsList: state => state.searchList.goodsList,
    attrsList: state => state.searchList.attrsList,
    trademarkList: state => state.searchList.trademarkList
  },
  mutations: {
    // 更新搜索列表
    GETSEARCHLIST (state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    // 获取搜索列表
    async getSearchList (store, params = {}) {
      const { data: res } = await reqGetSearchInfo(params)
      if (res.code === 200) {
        store.commit('GETSEARCHLIST', res.data)
      }
    }
  }
}
