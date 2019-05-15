import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.product + '/rule'

/**
 * 根据id查询产品投保规则
 * @param {*} id 产品投保规则主键id
 */
export const getProductRuleByRuleId = (id) => {
  return axios.request({
    url: service + `/info/${id}`,
    method: 'get'
  })
}

/**
 * 根据id查询产品投保规则
 * @param {*} id 产品主键id
 */
export const getProductRuleByProductId = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 查询产品投保规则初始化数据来源
 */
export const getProductInitRule = () => {
  return axios.request({
    url: service + `/interval/list`,
    method: 'get'
  })
}

/**
 * 创建产品投保规则信息
 * @param {*} data 产品投保规则信息对象
 */
export const addProductRule = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 更新产品投保规则信息
 * @param {*} data 产品投保规则信息对象
 */
export const updateProductRule = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

