import axios from '@/libs/api.request'
import { setToken, setUserId, getToken, getUserId, encryption } from '@/libs/util'
import config from '@/config/index'

const service = config.services.user

/**
 * 登录
 * @param {*} param0 
 */
// export const login = ({ name, password }) => {
//   const data = {
//     name,
//     password
//   }
//   return axios.request({
//     url: service + '/login',
//     data,
//     method: 'post'
//   })
// }

export const login = ({ name, password }) => {
  return axios.request({
    url: '/auth/oauth/token',
    params: {
      username: name,
      password: password,
      randomStr: '156456',
      code: 456456,
      grant_type: 'password',
      scope: 'server'
    },
    method: 'get',
    headers: {
      Authorization: 'Basic eGJrajp4Ymtq',
    }
  })
}

/**
 * 获取用户信息
 * @param {token} token 
 */
export const getUserById = (id) => {
  return axios.request({
    url: '/admin/user/info',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'TENANT-ID': '1'
    }
  })
}

/**
 * 添加用户
 * @param {name} name 
 */
export const addUser = ({ name, password }) => {
  return axios.request({
    url: service + '/save',
    data: {
      name,
      password
    },
    method: 'post'
  })
}

/**
 * 修改用户
 * @param {id} id 
 */
export const EditUser = (id, token) => {
  return axios.request({
    url: service + '/' + id,
    method: 'put',
    headers: {
      token: 'xbkj' + token
    }
  })
}

/**
 * 用户退出
 * @param {*}  
 */
export const logout = (id, token) => {
  return axios.request({
    url: service+ '/logout',
    method: 'post',
    data: {
      id
    },
    headers: {
      token: 'xbkj' + token
    }
  })
}
