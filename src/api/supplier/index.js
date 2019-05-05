import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.supplier
const serviceBusinessInformation = config.services.businessInformation
const serviceSub = config.services.mCompany

/**
 * 供应商->模糊查询
 * @param {*} param0 
 */
export const getSupplierPage = ({page, size, name}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      name
    },
    method: 'get'
  })
}

/**
 * 供应商->根据id查询
 * @param {*} id 供应商id
 */
export const getSupplierDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 供应商->条件查询
 * @param {*} param0 
 */
// export const getSupplierPage = ({page, size}) => {
//   return axios.request({
//     url: service + `/search/${page}/${size}`,
//     params: {
//       name
//     },
//     method: 'post'
//   })
// }

/**
 * 供应商->添加
 * @param {*} id 保险公司id
 * @param {*} data 
 */
export const addSupplier = (id, data) => {
  return axios.request({
    url: service + `/${id}`,
    data,
    method: 'post'
  })
}

/**
 * 供应商->修改
 * @param {*} data 
 */
export const updateSupplier = (data) => {
  return axios.request({
    url: service + `/${data.id}`,
    data,
    method: 'put'
  })
}
/**
 * 产品列表->查询供应商产品
 * @param {*} query 
 */
export const getSupplierProductPage = (query) => {
  let {page, size, sale, nameAndCode, supplierId, typeRuleId} = query
  return axios.request({
    url: service + `/findProduct/${page}/${size}`,
    params: {sale, nameAndCode, supplierId, typeRuleId},
    method: 'get'
  })
}

export const getSupplierBrandInformation = (supplierId) => {
  return axios.request({
    url: service + `/findBrandBySupplierId/${supplierId}`,
    params: {
      supplierId
    },
    method: 'get'
  })
}

/**
 * 工商信息->根据供应商id查询
 * @param {*} id 供应商id
 */
export const getSupplierBusinessInformation = (id) => {
  return axios.request({
    url: serviceBusinessInformation + `/findByGyId/${id}`,
    method: 'get'
  })
}

