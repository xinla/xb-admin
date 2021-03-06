import axios from '@/libs/api.request'
import config from '@/config'

const service = config.servicesV2.rate

/**
 * 根据id查询产品费率
 * @param {*} productId 产品id
 */
export const getProductRateByProductId = (productId, {page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      productId,
    },
    method: 'get'
  })
}

/**
 * 根据id查询产品费率
 * @param {*} id 产品费率主键id
 */
export const getProductRateByRateId = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 创建产品费率
 * @param {*} data 产品费率对象
 */
export const addProductRate = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 更新产品费率
 * @param {*} data 产品费率对象
 */
export const updateProductRate = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

