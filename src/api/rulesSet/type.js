import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.typeRule

/**
 * 创建规则
 * @param {*} data 
 */
export const addTypeRule = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 查询类型规则详情
 * @param {*} id 
 */
export const getTypeRuleRuleById = (id) => {
  return axios.request({
    url: service + `/detail/${id}`,
    method: 'get'
  })
}

/**
 * 更新类型规则详情
 * @param {*} data 
 */
export const updateTypeRule = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 删除类型规则
 * @param {*} id 
 */
export const deleteTypeRule = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'get'
  })
}

export const selectProductTypeRule = (id) => {
  return axios.request({
    url: service + `/selectProductTypeRule`,
    method: 'get'
  })
}

/**
 * 查询产品类型规则列表创 
 * @param {*} params 
 */
export const getTypeRulePage = (type, pageNum = 1, pageSize = 100) => {
  return axios.request({
    url: service + `/list`,
    params: {
      type, pageNum, pageSize
    },
    method: 'get'
  })
}
