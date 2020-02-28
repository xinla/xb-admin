import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.supplier
const serviceBusinessInformation = config.services.businessInformation
const serviceSub = config.services.mCompany

/**
 * 品牌->模糊查询
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
 * 品牌->根据id查询
 * @param {*} id 品牌id
 */
export const getSupplierDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 品牌->条件查询
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
 * 品牌->添加/修改
 * @param {*} id 保险公司id
 * @param {*} data 
 */
export const saveSupplier = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

/**
 * 产品列表->查询品牌产品
 * @param {*} query 
 * @param {*} sale 0在售,1停售
 */
export const getSupplierProductPage = (query) => {
  let {page, size, sale, nameAndCode, supplierId, typeRuleId} = query
  return axios.request({
    url: service + `/findProduct/${page}/${size}`,
    params: {sale, nameAndCode, supplierId, typeRuleId},
    method: 'get'
  })
}

/**
 * 品牌->根据品牌id查询合作企业列表
 * @param {*} param0 
 */
export const getCooperationCompanyPage = ({page, size, supplierId}) => {
  return axios.request({
    url: service + `/cooperationCompanyNum/${page}/${size}`,
    params: {
      supplierId
    },
    method: 'get'
  })
}

/**
 * 品牌信息->根据品牌id查询
 * @param {*} supplierId 
 */
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
 * 工商信息->根据品牌id查询
 * @param {*} id 品牌id
 */
export const getSupplierBusinessInformation = (id) => {
  return axios.request({
    url: serviceBusinessInformation + `/findByGyId/${id}`,
    method: 'get'
  })
}

/**
 * 获取投保所有省信息
 * @param {*} 
 */
export const getInsureAllProvice = () => {
  return axios.request({
    url: service + `/findAllProvince`,
    method: 'get'
  })
}

export const deleteSupplier = (id, userId) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'POST',
    headers: {
      userId
    }
  })
}
