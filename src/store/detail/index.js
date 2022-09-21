// detail模块仓库
import { reqGoodsInfo, reqAddorUpdateShopCar } from '@/api'
import { getUUID } from '@/utils/uuid_token'
export default {
  state: {
    goodsInfo: {},
    uuid_token: getUUID()
  },
  getters: {
    //  路径导航
    categoryView: state => state.goodsInfo.categoryView || {},
    // 产品信息
    skuInfo: state => state.goodsInfo.skuInfo || {},
    // 产品售卖属性
    spuSaleAttrList: state => state.goodsInfo.spuSaleAttrList || []
  },
  mutations: {
    REQGOODSINFO (state, goodsInfo) {
      state.goodsInfo = goodsInfo
    }
  },
  actions: {
    async reqGoodsInfoAction (store, skuId) {
      const { data: res } = await reqGoodsInfo(skuId)
      if (res.code === 200) {
        store.commit('REQGOODSINFO', res.data)
      }
    },
    // 更新和添加->购物车的信息
    // 用await修饰会返回一个Promise对象
    async addorUpdateShopCar (store, { skuId, skuNum }) {
      const { data: res } = await reqAddorUpdateShopCar(skuId, skuNum)
      if (res.code === 200) {
        // 返回非空字符串表示成功，修改Promise为成功的状态
        return '成功'
      } else {
        // 修改Promise为失败的状态
        return Promise.reject(new Error('faile'))
      }
    }
  }
}
