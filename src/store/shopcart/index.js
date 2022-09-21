// shopcart 模块仓库
import { reqShopCartList, deleteGoodsInfo, reqUpdateCheckCart } from '@/api'
export default {
  state: {
    cartList: []
  },
  getters: {
    cartList: state => state.cartList[0] || {}
  },
  mutations: {
    GETSHOPCARTLIST (state, cartList) {
      state.cartList = cartList
    }
  },
  actions: {
    // 获取购物车信息
    async getShopCartList (store) {
      const { data: res } = await reqShopCartList()
      if (res.code === 200) {
        store.commit('GETSHOPCARTLIST', res.data)
      }
    },
    // 删除购物车列表数据
    async deleteShopCartLis (store, skuId) {
      const { data: res } = await deleteGoodsInfo(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise(new Error('faile'))
      }
    },
    // 切换商品选中状态
    async upDateShopCart (store, { skuId, isChecked }) {
      const { data: res } = await reqUpdateCheckCart(skuId, isChecked)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  }

}
