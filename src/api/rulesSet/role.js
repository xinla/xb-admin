import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.role

/**
 * 创建规则
 * @param {*} roleGroupId 
 * @param {*} roleName 
 */
export const addRoleRule = (roleGroupId, roleName) => {
  return axios.request({
    url: service + `/create`,
    data: {
      roleGroupId,
      roleName
    },
    method: 'post'
  })
}

/**
 * 查询角色规则详情
 * @param {*} id 
 */
export const getRoleRuleById = (id) => {
  return axios.request({
    url: service + `/detail/${id}`,
    method: 'get'
  })
}

/**
 * 更新角色规则详情
 * @param {*} data 
 */
export const updateRoleRule = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 删除角色规则
 * @param {*} id 
 */
export const deleteRoleRule = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'get'
  })
}

/**
 * 查询角色规则列表
 * @param {*} pageNum 
 * @param {*} pageSize 
 */
export const getRoleRulePage = (pageNum = 1, pageSize = 100) => {
  return axios.request({
    url: service + `/list`,
    params: {
      pageNum, pageSize
    },
    method: 'get'
  })
}
