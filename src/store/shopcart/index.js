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
    },
    // 删除选中状态的商品
    deleteCheckedAll ({ dispatch, getters }) {
      const PromiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        // 三元表达式写法
        const promise = item.isChecked === 1 ? dispatch('deleteShopCartLis', item.skuId) : ''
        PromiseAll.push(promise)
        // if表达式写法
        // if (item.isChecked === 1) {
        //   const promise = dispatch('deleteShopCartLis', item.skuId)
        //   PromiseAll.push(promise)
        // }
      })
      return Promise.all(PromiseAll)
    },
    // 修改全部商品勾选状态
    isCheckedAll ({ dispatch, getters }, isChecked) {
      const PromiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        const promise = dispatch('upDateShopCart', { skuId: item.skuId, isChecked })
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }
  }

}
