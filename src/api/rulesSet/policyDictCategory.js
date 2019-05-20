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
    params: {
      name
    },
    method: 'get'
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
 * 数字字典->投保数据来源字典表值->根据id 查询详情
 * @param {*} name 供应商名
 */
export const savePolicyDictCategoryValue = (name) => {
  return axios.request({
    url: service + `/save`,
    params: {
      name
    },
    data: {
      dictCategoryId: '',  // 
      categoryNumber: '',  // 标号	
      categoryValue: '',  // 数值	
      isShow: '',  // 0可见,1隐藏
    },
    method: 'post'
  })
}

/**
 * 
 * @param {*} param0 
 */
export const getPolicyDictCategoryValueDetail = ({page, size, CategoryId, name}) => {
  return axios.request({
    url: service + `/findByCategoryId/${CategoryId}/${page}/${size}`,
    params: {
      name
    },
    method: 'get'
  })
}

