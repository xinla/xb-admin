import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.product

/**
 * 查询产品列表
 * @param {*} params 
 */
export const getProductPage = (params) => {
  return axios.request({
    url: service + `/page/list`,
    params,
    method: 'get'
  })
}

/**
 * 创建产品基本信息
 * @param {*} data 产品基本信息对象
 */
export const addProductInfo = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 修改产品
 * @param {*} data 产品对象
 */
export const updateProductInfo = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 查询产品基本信息
 * @param {*} id 
 */
export const getProductInfoById = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 根据产品类型查询产品列表
 * @param {*} type 0  主险  1 附加险
 */
export const getProductPageByType = (type) => {
  return axios.request({
    url: service + `/list/${type}`,
    method: 'get'
  })
}

