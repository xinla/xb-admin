import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.product + '/attachment'

/**
 * 根据id查询产品附件信息
 * @param {*} id 产品主键id
 */
export const getProductAttachmentByProductId = (id) => {
  return axios.request({
    url: service + `/info/${id}`,
    method: 'get'
  })
}

/**
 * 根据id查询产品附件信息
 * @param {*} id 产品附件表主键id
 */
export const getProductAttachmentByAttachmentId = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 创建产品附件
 * @param {*} data 产品附件对象
 */
export const addProductAttachment = (data) => {
  return axios.request({
    url: service + `/create`,
    data,
    method: 'post'
  })
}

/**
 * 修改产品附件
 * @param {*} data 产品附件对象
 */
export const updateProductAttachment = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

