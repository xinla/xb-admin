import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainPs + config.servicesPs.admin + '/user'

/**
 * 获取用户列表
 * @param {*} data 
 */
export const getUserPage = (data) => {
  return axios.request({
    url: service + `/page`,
    params: data,
    method: 'get'
  })
}

/**
 * 根据用户名获取用户信息
 * @param {*} data 
 */
export const getUserInfo = (data) => {
  return axios.request({
    url: service + `/details/${data}`,
    method: 'get'
  })
}

/**
 * 添加用户
 * @param {*} data 
 */
export const addUser = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

/**
 * 修改用户/修改密码
 * @param {*} data 
 */
export const updateUser = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'put'
  })
}

/**
 * 删除用户
 * @param {*} userId 
 */
export const removeUser = (userId) => {
  return axios.request({
    url: service + `/${userId}`,
    method: 'DELETE'
  })
}

/**
 * 修改个人信息
 * @param {*} data 
 */
export const modifyUser = (data) => {
  return axios.request({
    url: service + '/edit',
    data,
    method: 'put'
  })
}
