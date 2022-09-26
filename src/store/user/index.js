import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
// import { Message } from 'element-ui'
export default {
  state: {
    code: '',
    token: getToken(),
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
    },
    // 清空本地数据
    CLEAR (state) {
      // 清空仓库中的数据
      state.token = ''
      state.userInfo = {}
      // 清空本地存储的token
      removeToken()
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
        // 获取到token
        commit('GETTOKEN', res.data.token)
        // 持久化存储token
        setToken(res.data.token)
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
    },
    // 退出登录
    async userLoguot ({ commit }) {
      // 调用退出登录API清空服务器的token
      const { data: res } = await reqLogout()
      if (res.code === 200) {
        // 清空信息
        commit('CLEAR')
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  }
}
