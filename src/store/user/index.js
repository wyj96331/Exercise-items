import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo } from '@/api'
// import { Message } from 'element-ui'
export default {
  state: {
    code: '',
    token: '',
    userInfo: {}
  },
  getters: {},
  mutations: {
    // 获取验证码
    GETCODE (state, code) {
      state.code = code
    },
    // 获取token
    GETTOKEN (state, token) {
      state.token = token
    },
    // 获取用户信息
    GETUSERINFO (state, userInfo) {
      state.userInfo = userInfo
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
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 用户登录，获取token
    async userLogin ({ commit }, data) {
      const { data: res } = await reqUserLogin(data)
      if (res.code === 200) {
        commit('GETTOKEN', res.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 获取用户信息
    async getUserInfo ({ commit }) {
      const { data: res } = await reqGetUserInfo()
      if (res.code === 200) {
        commit('GETUSERINFO', res.data)
      }
    }
  }
}
