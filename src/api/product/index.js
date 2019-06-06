import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.product

/**
 * 查询产品列表
 * @param {*} query 
 */
export const getProductPage = ({pageNum, pageSize, searchValue, typeRuleId, distributionChannel}) => {
  return axios.request({
    url: service + `/page/list`,
    params: {
      pageNum,
      pageSize,
      searchValue,
      typeRuleId,
      distributionChannel
    },
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
 * @param {*} id 产品基本信息id或产品id
 */
export const getProductInfo = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 根据产品类型查询产品列表
 * @param {*} productForm
 */
export const getProductPageByType = (productForm, params) => {
  return axios.request({
    url: service + `/list/${productForm}`,
    params,
    method: 'get'
  })
}

/**
 * 上架产品
 * @param { } id 
 */
export const saleProduct = (id) => {
  return axios.request({
    url: service + `/toSale/${id}`,
    method: 'post'
  })
}

/**
 * 根据id删除产品
 * @param {*} id 
 */
export const deleteProduct = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'post'
  })
}
