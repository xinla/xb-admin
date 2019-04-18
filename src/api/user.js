import axios from '@/libs/api.request'

const controller = '/user'

/**
 * 登录
 * @param {*} param0 
 */
export const login = ({ name, password }) => {
  const data = {
    name,
    password
  }
  return axios.request({
    url: controller + '/login',
    data,
    method: 'post'
  })
}

/**
 * 获取用户信息
 * @param {token} token 
 */
export const getUserById = (id) => {
  return axios.request({
    url: controller + '/' + id,
    method: 'get'
  })
}

/**
 * 添加用户
 * @param {name} name 
 */
export const addUser = ({ name, password }) => {
  return axios.request({
    url: controller + '/save',
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
    url: controller + '/' + id,
    method: 'put',
    header: {
      token: 'xbkj' + token
    }
  })
}

/**
 * 用户退出
 * @param {*}  
 */
export const logout = (token) => {
  return axios.request({
    url: controller+ '/logout',
    method: 'post',
    header: {
      token: 'xbkj' + token
    }
  })
}
