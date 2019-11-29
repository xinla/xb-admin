import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainPs + config.servicesPs.admin + '/role'

/**
 * 分页获取角色列表
 */
export const getRolePage = (params) => {
  return axios.request({
    url: service + `/page`,
    params,
    method: 'get'
  })
}

/**
 * 获取角色列表
 */
export const getAllRole = () => {
  return axios.request({
    url: service + `/list`,
    method: 'get'
  })
}

/**
 * 添加一个角色
 * @param {*} data 
 */
export const addRole = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

/**
 * 修改一个角色
 * @param {*} data 
 */
export const updateRole = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'put'
  })
}

/**
 * 删除一个角色
 * @param {*} roleId 
 */
export const removeRole = (roleId) => {
  return axios.request({
    url: service + `/${roleId}`,
    method: 'DELETE'
  })
}


export const updateRolePermission = (roleId, menuIds) => {
  return axios.request({
    url: service + '/menu',
    params: {
      roleId, menuIds
    },
    method: 'put'
  })
}
