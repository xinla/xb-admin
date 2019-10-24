import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainV2A + config.servicesV2.product

/**
 * 查询核保规则
 * @param {*} id 
 */
export const getProductRule = (id) => {
  return axios.request({
    url: service + `/rule/${id}`,
    method: 'get'
  })
}

/**
 * 查询投保人或者被保人规则
 * @param {*} id 产品主键id
 */
export const getAppntInsuredRule = (id) => {
  return axios.request({
    url: service + `/appntInsuredRule/${id}`,
    method: 'get'
  })
}

/**
 * 保存投保人或者被保人规则
 * @param {*} data 
 */
export const saveAppntInsuredRule = (data) => {
  return axios.request({
    url: service + `/appntInsuredRule/save`,
    data,
    method: 'post'
  })
}

/**
 * 修改投保人或者被保人规则
 * @param {*} data 
 */
export const updateAppntInsuredRule = (data) => {
  return axios.request({
    url: service + `/appntInsuredRule/update`,
    data,
    method: 'post'
  })
}

/**
 * 清空投保人或者被保人规则
 * @param {*} id 
 */
export const clearAppntInsuredRule = (id) => {
  return axios.request({
    url: service + `/appntInsuredRule/deleteRule/${id}`,
    method: 'post'
  })
}

/**
 * 查询保额规则
 * @param {*} id 产品投保规则主键id
 */
export const getCoverageRule = (id) => {
  return axios.request({
    url: service + `/coverageRule/${id}`,
    method: 'get'
  })
}

/**
 * 创建保额规则
 * @param {*} data 
 */
export const saveCoverageRule = (data) => {
  return axios.request({
    url: service + `/coverageRule/save`,
    data,
    method: 'post'
  })
}

/**
 * 修改保额规则
 * @param {*} data 
 */
export const updateCoverageRule = (data) => {
  return axios.request({
    url: service + `/coverageRule/update`,
    data,
    method: 'post'
  })
}

/**
 * 清空保额规则
 * @param {*} id 
 */
export const clearCoverageRule = (id) => {
  return axios.request({
    url: service + `/coverageRule/deleteRule/${id}`,
    method: 'post'
  })
}

/**
 * 查询保险期间规则
 * @param {*} id 
 */
export const getInPeriodRule = (id) => {
  return axios.request({
    url: service + `/inPeriod/${id}`,
    method: 'get'
  })
}

/**
 * 保存保险期间规则
 * @param {*} data 
 */
export const saveInPeriodRule = (data) => {
  return axios.request({
    url: service + `/inPeriod/save`,
    data,
    method: 'post'
  })
}

/**
 * 修改保险期间规则
 * @param {*} data 
 */
export const updateInPeriodRule = (data) => {
  return axios.request({
    url: service + `/inPeriod/update`,
    data,
    method: 'post'
  })
}

/**
 * 清空保险期间规则
 * @param {*} data [
  "2367244289504706563",
  "2367244290393899009"
]
 */
export const clearInPeriodRule = (data) => {
  return axios.request({
    url: service + `/inPeriod/deleteById`,
    data,
    method: 'post'
  })
}

/**
 * 查询交费规则
 * @param {*} id 
 */
export const getPayRule = (id) => {
  return axios.request({
    url: service + `/payRule/${id}`,
    method: 'get'
  })
}

/**
 * 保存交费规则
 * @param {*} data 
 */
export const savePayRule = (data) => {
  return axios.request({
    url: service + `/payRule/save`,
    data,
    method: 'post'
  })
}

/**
 * 保存交费规则
 * @param {*} data 
 */
export const updatePayRule = (data) => {
  return axios.request({
    url: service + `/payRule/update`,
    data,
    method: 'post'
  })
}

/**
 * 清空交费规则
 * @param {*} id 交费规则主键id
 */
export const clearPayRule = (id) => {
  return axios.request({
    url: service + `/payRule/deleteById/${id}`,
    method: 'post'
  })
}

/**
 * 查询领取规则
 * @param {*} id 
 */
export const getReceiveRule = (id) => {
  return axios.request({
    url: service + `/receiveRule/${id}`,
    method: 'get'
  })
}

/**
 * 保存领取规则
 * @param {*} data 
 */
export const saveReceiveRule = (data) => {
  return axios.request({
    url: service + `/receiveRule/save`,
    data,
    method: 'post'
  })
}

/**
 * 保存领取规则
 * @param {*} data 
 */
export const updateReceiveRule = (data) => {
  return axios.request({
    url: service + `/receiveRule/update`,
    data,
    method: 'post'
  })
}


/**
 * 清空领取规则
 * @param {*} id 领取规则主键id
 */
export const clearReceiveRule = (id) => {
  return axios.request({
    url: service + `/receiveRule/deleteRuleById/${id}`,
    method: 'post'
  })
}
