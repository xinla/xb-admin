import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.profession
const serviceV2 = config.servicesV2.profession

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
 *  @param {*} insuranceCompanyId 品牌id *
 *  @param {*} params 职业代码名称
 *  @param {*} type 不传查常用职业,type传1表示查品牌下所有职业
 */
export const getProfessionPage = ({insuranceCompanyId, params, page, size, type}) => {
  return axios.request({
    url: serviceV2 + `/findOccuoational/${page}/${size}`,
    params: {
      insuranceCompanyId,
      params,
      type
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

/**
 * 查询大类中类小类职业代码
 * @param {*} insuranceCompanyId 
 * @param {*} type 
 */
export const getProfessionClasses = (insuranceCompanyId, type, data) => {
  return axios.request({
    url: serviceV2 + `/findCategory`,
    params: {
      insuranceCompanyId,
      type
    },
    data,
    method: 'post'
  })
}

/**
 * 查询大中小职的标签
 * @param {*} supplierId 
 */
export const getProfessionTabs = (supplierId) => {
  return axios.request({
    url: serviceV2 + `/getTitleBar`,
    params: {
      supplierId,
    },
    method: 'get'
  })
}
