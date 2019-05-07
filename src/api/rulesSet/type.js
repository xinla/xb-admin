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
export const getTypeRuleById = (id) => {
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
    method: 'post'
  })
}

export const selectProductTypeRule = (id) => {
  return axios.request({
    url: service + `/selectProductTypeRule`,
    method: 'get'
  })
}

/**
 * 查询类型规则列表
 * @param {*} type 0 供应商类型，1 产品类型
 * @param {*} pageNum 
 * @param {*} pageSize 
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
