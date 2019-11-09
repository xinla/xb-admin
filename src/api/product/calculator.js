import axios from '@/libs/api.request'
import config from '@/config'

const service = config.servicesV2.product
const service1 = config.servicesV2.calculator

export const getCalculator = (data) => {
  return axios.request({
    url: service1 + `/getCalculator`,
    data,
    method: 'post'
  })
}

/**
 * 保存保费计算器基本规则
 * @param {*} data 
 */
export const saveCalculator = (data) => {
  return axios.request({
    url: service + `/cal/save`,
    data,
    method: 'post'
  })
}

/**
 * 修改保费计算器基本规则
 * @param {*} data 
 */
export const updateCalculator = (data) => {
  return axios.request({
    url: service + `/cal/update`,
    data,
    method: 'post'
  })
}

/**
 * 查询保费计算器基本规则
 * @param {*} id 产品主键id
 */
export const getCalculatorBase = (id) => {
  return axios.request({
    url: service + `/cal/queryCal/${id}`,
    method: 'get'
  })
}

/**
 * 查询保费计算器项目
 * @param {*} id 产品主键id
 */
export const getAllCalculatorItem = (id) => {
  return axios.request({
    url: service + `/cal/queryCalItem/${id}`,
    method: 'get'
  })
}

/**
 * 勾选左侧选项项目(查询勾选项目信息)
 * @param {*} productId 产品基本信息id
 * @param {*} id 左侧选项id
 */
export const getCalculatorItemInfo = (productId, id) => {
  return axios.request({
    url: service + `/cal/queryConfigItem/${productId}/${id}`,
    method: 'get'
  })
}

/**
 * 右侧选项项目取消勾选
 * @param {*} param0 
 */
export const uncheckCalculatorItem = ({productId, calItemId}) => {
  return axios.request({
    url: service + `/cal/updateItemConfigStatus/${productId}/${calItemId}`,
    method: 'POST'
  })
}

/**
 * 保存保费计算器选项卡
 * @param {*} data 
 */
export const saveCalculatorItemInfo = (data) => {
  return axios.request({
    url: service + `/cal/saveCalItemConfig`,
    data,
    method: 'POST'
  })
}

/**
 * 修改保费计算器选项卡
 * @param {*} data 
 */
export const updateCalculatorItemInfo = (data) => {
  return axios.request({
    url: service + `/cal/updateCalItemConfig`,
    data,
    method: 'POST'
  })
}
