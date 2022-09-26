import { reqGetCode, reqUserRegister, reqUserLogin } from '@/api'
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
    // 获取验证码
    async getCode ({ commit }, phone) {
      const result = await reqGetCode(phone)
      if (result.data.code === 200) {
        commit('GETCODE', result.data.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
    async userRegister ({ commit }, user) {
      const { data: res } = await reqUserRegister(user)
      console.log(res.message)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('falie'))
      }
    },
    // 用户登录
    async userLogin ({ commit }, data) {
      const { data: res } = await reqUserLogin(data)
      console.log(res)
    }
  }
}
