import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.supplier
const serviceSub = config.services.mCompany

/**
 * 供应商->模糊查询
 * @param {*} param0 
 */
export const getSupplierPage = ({page, size, name}) => {
  return axios.request({
    url: service + `/${page}/${size}`,
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
export const getSupplierPage = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 供应商->条件查询
 * @param {*} param0 
 */
export const getSupplierPage = ({page, size}) => {
  return axios.request({
    url: service + `/search/${page}/${size}`,
    params: {
      name
    },
    method: 'post'
  })
}
