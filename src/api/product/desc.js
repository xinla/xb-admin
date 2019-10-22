import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainV2A + config.servicesV2.product + '/desc'

/**
 * 根据id查询产品说明
 * @param {*} id 产品主键id
 */
export const getProductDesc = (id) => {
  return axios.request({
    url: service + `/queryProductDescByPid/${id}`,
    method: 'get'
  })
}

/**
 * 创建产品说明
 * @param {*} data 产品说明对象
 */
export const saveProductDesc = (data) => {
  return axios.request({
    url: service + `/save`,
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

/**
 * 清空产品描述
 * @param {*} id 
 */
export const clearProductDesc = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'post'
  })
}
