import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.supplierOrganization

/**
 * 组织架构->查询全部
 * @param {*} supperId 供应商id
 */
export const getSupplierOrganization = (supperId) => {
  return axios.request({
    url: service + `/findAllOrganization`,
    params: {
      supperId
    },
    method: 'get'
  })
}

/**
 * 组织架构->根据id查询
 * @param {*} id 组织架构id
 */
export const getSupplierOrganizationDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加供应商组织架构
 * @param {*} data 
 */
export const addSupplierOrganization = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

export const updateSupplierOrganization = (data) => {
  return axios.request({
    url: service + `/${data.id}`,
    data,
    method: 'put'
  })
}
