import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.policyDictCategory
const serviceSub = config.services.policyDictCategory + 'Value'

/**
 * 数字字典->根据id查询   
 * @param {*} id 
 */
export const getPolicyDictCategoryDetail = (id, name) => {
  return axios.request({
    url: service + `/findById/${id}`,
    params: {
      name
    },
    method: 'get'
  })
}

/**
 * 数字字典->查询全部 
 * @param {*} name 供应商名
 */
export const getPolicyDictCategoryPage = ({page, size, name}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    data: {
      name
    },
    method: 'post'
  })
}

/**
 * 数字字典->增加/修改
 * @param {*} data 
 */
export const savePolicyDictCategory = (data) => {
  return axios.request({
    url: service + `/save`,
    data,
    method: 'post'
  })
}

/**
 * 数字字典->数值的增加/修改
 * @param {*} data 
 */
export const savePolicyDictCategoryValue = (data) => {
  return axios.request({
    url: serviceSub + `/save`,
    data,
    method: 'post'
  })
}

/**
 * 数字字典->根据id删除数值
 * @param {*} id 
 */
export const deletePolicyDictCategory = (id) => {
  return axios.request({
    url: serviceSub + `/deleteById/${id}`,
    method: 'post'
  })
}

/**
 * 
 * @param {*} param0 
 */
export const getPolicyDictCategoryValueDetail = ({page, size, CategoryId, name}) => {
  return axios.request({
    url: service + `/deleteById/${id}`,
    params: {
      name
    },
    method: 'get'
  })
}

