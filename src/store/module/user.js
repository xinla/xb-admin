import { login, logout, getUserById } from '@/api/user'
import { setToken, setUserId, getToken, getUserId, encryption } from '@/libs/util'
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
      let userInfo = {
        name: userName.trim(),
        password,
      }
      const user = encryption({
        data: userInfo,
        key: 'pigxpigxpigxpigx',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        login(user).then(res => {
          // console.log(user)
          commit('setToken', res.access_token)
          commit('setUserId', res.user_id)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.userId, state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserById(state.userId).then(({permissions, roles, sysUser}) => {
            commit('setAvator', sysUser.avatar)
            commit('setUserName', sysUser.username)
            commit('setUserId', sysUser.userId)
            // commit('setAccess', res.access)
            commit('setHasGetInfo', true)
            resolve(sysUser)
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
