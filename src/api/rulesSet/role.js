import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.role

/**
 * 创建规则
 * @param {*} roleGroupId 
 * @param {*} roleName 
 */
export const addRoleRule = ({newRoleGroupId, roleName}) => {
  return axios.request({
    url: service + `/create`,
    data: {
      roleGroupId: newRoleGroupId,
      roleName
    },
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it]) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
    // header: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
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
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it]) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}

/**
 * 删除角色规则
 * @param {*} id 
 */
export const deleteRoleRule = ({roleId, roleGroupId}) => {
  return axios.request({
    url: service + `/delete/${roleId}/${roleGroupId}`,
    method: 'post'
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
