import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.supplierUser

/**
 * 组织架构->查询全部用户
 * @param {*} supplierId 供应商id
 */
export const getSupplierUserPage = ({supplierId, page, size}) => {
  return axios.request({
    url: service + `/${page}/${size}`,
    params: {
      supplierId
    },
    method: 'get'
  })
}

/**
 * 组织架构->根据id查询用户
 * @param {*} id 用户id
 */
export const getSupplierUserDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 组织架构->添加用户
 * @param {*} data 
 */
export const addSupplierUser = (data) => {
  return axios.request({
    url: service + `/save`,
    data,
    method: 'post'
  })
}

/**
 * 组织架构->修改用户
 * @param {*} data 
 */
export const updateSupplierUser = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 组织架构->根据id删除用户
 * @param {*} id 用户id
 */
export const deleteSupplierUser = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'delete'
  })
}
/**
 * 组织架构->查询所有角色
 */
export const getAllGroupAndRole = () => {
  return axios.request({
    url: service + `/selectAllGroupAndRole`,
    method: 'get'
  })
}
