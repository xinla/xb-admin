import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainPs + config.servicesPs.admin + '/dept'

/**
 * 获取部门树形图数据
 */
export const getDeptTree = () => {
  return axios.request({
    url: service + `/tree`,
    method: 'get'
  })
}

/**
 * 修改一个部门
 * @param {*} data 
 */
export const addDept = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

/**
 * 修改一个部门
 * @param {*} data 
 */
export const updateDept = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'put'
  })
}

/**
 * 删除一个部门
 * @param {*} userId 
 */
export const removeDept = (deptId) => {
  return axios.request({
    url: service + `/${deptId}`,
    method: 'DELETE'
  })
}
