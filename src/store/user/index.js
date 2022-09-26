import { reqGetCode } from '@/api'
export default {
  state: {
    code: ''
  },
  getters: {},
  mutations: {
    GETCODE (state, code) {
      state.code = code
    }
  },
  actions: {
    async getCode ({ commit }, phone) {
      const result = await reqGetCode(phone)
      if (result.data.code === 200) {
        commit('GETCODE', result.data.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  }
}
