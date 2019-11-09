import axios from '@/libs/api.request'
import config from '@/config'

const service = config.servicesV2.product

/**
 * 查询产品列表
 * @param {*} query 
 */
export const getProductPage = (params) => {
  return axios.request({
    url: service + `/page/list`,
    params,
    method: 'get'
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
 * 在售/停售产品
 * @param { } id 产品id
 * @param { } status 0 停售  1 在售
 */
export const saleProduct = (ids, status) => {
  return axios.request({
    url: service + `/sale/${status}`,
    data: ids,
    method: 'post'
  })
}

/**
 * 
 * @param {*} id 产品id
 * @param {*} status 0 撤回 1  发布
 * @param {*} userId 0 用户id
 */
export const publishProduct = (ids, status, userId) => {
  return axios.request({
    url: service + `/publish/${status}/${userId}`,
    data: ids,
    method: 'post'
  })
}

/**
 * 删除产品
 * @param {*} id 
 */
export const deleteProduct = (ids, userId) => {
  return axios.request({
    url: service + `/deleteProduct`,
    data: ids,
    method: 'post',
    headers: {
      userId
    }
  })
}

/**
 * 快速创建产品
 * @param {*} data 
 */
export const fastCreateProductInfo = (data) => {
  return axios.request({
    url: service + `/fastCreate`,
    data,
    method: 'post'
  })
}

/**
 * 创建产品基本信息
 * @param {*} data 产品基本信息对象
 */
export const createProductInfo = (data) => {
  return axios.request({
    url: service + `/create`,
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
    url: service + `/queryProductById/${id}`,
    method: 'get'
  })
}
