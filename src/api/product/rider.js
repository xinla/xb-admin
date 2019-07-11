import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.product + '/rider'

/**
 * 根据id查询产品附加险
 * @param {*} id 产品附加险主键id
 */
export const getProductRiderByProductId = (id) => {
  return axios.request({
    url: service + `/info/${id}`,
    method: 'get'
  })
}

/**
 * 根据id查询产品附加险
 * @param {*} id 产品附加险主键id
 */
export const getProductRiderByRiderId = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 创建产品附加险
 * @param {*} data 产品附加险对象
 */
export const addProductRider = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 更新产品附加险
 * @param {*} data 产品附加险对象
 */
export const updateProductRider = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

export const deleteProductRider = (data) => {
  return axios.request({
    url: service + `/delete/${data}`,
    method: 'post'
  })
}
