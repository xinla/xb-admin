import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.supplierNews

/**
 * 新闻资讯->查询
 * @param {*} param0 
 */
export const getSupplierNewPage = ({page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 新闻资讯->根据id查询
 * @param {*} id 
 */
export const getSupplierNewDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加资讯
 * @param {*} data 
 */
export const addSupplierNew = (data) => {
  return axios.request({
    url: service + `/${id}`,
    data,
    method: 'post'
  })
}
