import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.roleGroup

/**
 * 创建规则
 * @param {*} groupName 
 */
export const addRoleGroupRule = (groupName) => {
  return axios.request({
    url: service + `/create`,
    data: {
      groupName
    },
    method: 'post'
  })
}

/**
 * 查询角色组规则详情
 * @param {*} id 
 */
export const getRoleGroupRuleById = (id) => {
  return axios.request({
    url: service + `/detail/${id}`,
    method: 'get'
  })
}

/**
 * 更新角色组规则详情
 * @param {*} data 
 */
export const updateRoleGroupRule = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 删除角色组规则
 * @param {*} id 
 */
export const deleteRoleGroupRule = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'get'
  })
}

/**
 * 查询角色组规则列表
 * @param {*} pageNum 
 * @param {*} pageSize 
 */
export const getRoleGroupRulePage = (pageNum = 1, pageSize = 100) => {
  return axios.request({
    url: service + `/list`,
    params: {
      pageNum, pageSize
    },
    method: 'get'
  })
}
