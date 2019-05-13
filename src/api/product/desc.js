import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.product + '/desc'

/**
 * 根据id查询产品说明
 * @param {*} id 产品说明主键id
 */
export const getProductDescInfo = (id) => {
  return axios.request({
    url: service + `/info/${id}`,
    method: 'get'
  })
}

/**
 * 根据id查询产品说明
 * @param {*} id 产品说明主键id
 */
export const getProductDesc = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 创建产品说明
 * @param {*} data 产品说明对象
 */
export const addProductDesc = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 更新产品说明
 * @param {*} data 产品说明对象
 */
export const updateProductDesc = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

