import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.profession

/**
 * (未用)
 * 职业代码表->上传
 * @param {*} file 文件
 * @param {*} supplierId 供应商id 
 */
export const importProfessionTable = ({file, supplierId}) => {
  return axios.request({
    url: service + `/import`,
    data: {
      file, supplierId
    },
    method: 'post'
  })
}

/**
 * 查询所有职业代码
 */
export const getProfessionPage = ({supplierId, params, page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      supplierId,
      params
    },
    method: 'get'
  })
}

/**
 * 职业代码表->修改
 */
export const updateProfession = (data) => {
  return axios.request({
    url: service + `/update`,
    method: 'post',
    data
  })
}

/**
 * 获取所有职业代码表的品牌
 */
export const getProfessionAllBrand = () => {
  return axios.request({
    url: service + `/findAllSupplierId`,
    method: 'get',
  })
}

export const getProfessionBy = (params) => {
  return axios.request({
    url: service + `/findByParams`,
    method: 'get',
    params
  })
}
