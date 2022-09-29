// trade 模块仓库
import { reqGetUserAddress, reqGetOrderInfo } from '@/api'
export default {
  state: {
    address: '', // 用户地址信息
    orderInfo: {}// 交易页商品信息
  },
  getters: {
  },
  mutations: {
    // 获取用户地址信息
    GETUSERADDRESS (state, address) {
      state.address = address
    },
    // 获取订单交易页信息
    GETORDERINFO (state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  actions: {
    // 获取用户地址信息
    async getUserAddress (store) {
      const { data: res } = await reqGetUserAddress()
      if (res.code === 200) {
        store.commit('GETUSERADDRESS', res.data)
      }
    },
    // 获取订单交易页信息
    async getOrderInfo (store) {
      const { data: res } = await reqGetOrderInfo()
      if (res.code === 200) {
        store.commit('GETORDERINFO', res.data)
      }
    }
  }

}
