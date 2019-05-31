import { login, logout, getUserById } from '@/api/user'
import { setToken, setUserId, getToken, getUserId } from '@/libs/util'
import Cookies from 'js-cookie' 

export default {
  state: {
    userName: '',
    userId: getUserId(),
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath || require('@/assets/images/defaultHeader1.jpg')
    },
    setUserId (state, id) {
      state.userId = id
      setUserId(id)
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      name = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          name,
          password
        }).then(res => {
          const user = res.user
          // console.log(user)
          commit('setToken', res.token)
          commit('setUserId', user.id)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.userId, state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserById(state.userId).then(res => {
            commit('setAvator', res.headImage)
            commit('setUserName', res.name)
            commit('setUserId', res.id)
            // commit('setAccess', res.access)
            commit('setHasGetInfo', true)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
