import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.policyDictCategory
const serviceSub = config.services.policyDictCategory + 'Value'

/**
 * 查询字典项所有内容
 */
export const getAllPolicyDictCategory = () => {
  return axios.request({
    url: service + `/findAll`,
    method: 'get'
  })
}

/**
 * 查询字典项添加弹框内容
 * @param {*} id 供应商id
 */
export const getPolicyDictCategoryList = (id) => {
  return axios.request({
    url: service + `/findDictItem/${id}`,
    method: 'get'
  })
}

/**
 * 批量删除字典
 * @param {*} data ["1","2"]
 */
export const removePolicyDictCategory = (data) => {
  return axios.request({
    url: service + `/delete`,
    method: 'post',
    data,
  })
}

/**
 * 保存数据字典
 * @param {*} data [
  {
    "supplierId": "2387437597006757894",
    "dictName": "学历"
  }
]
 */
export const savePolicyDictCategory = (data) => {
  return axios.request({
    url: service + `/save`,
    method: 'post',
    data,
  })
}

/**
 * 查询字典删除弹框内容
 * @param {*} id 
 */
export const getDeleteDictItem = (id) => {
  return axios.request({
    url: service + `/findDeleteDictItem/${id}`,
    method: 'get',
  })
}

/**
 * 数字字典->数值的增加/修改 / 保存数据字典具体内容
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
 * 数字字典->根据id删除数值 / 删除数据字典具体内容
 * @param {*} id 
 */
export const deletePolicyDictCategoryValue = (id) => {
  return axios.request({
    url: serviceSub + `/deleteById/${id}`,
    method: 'post'
  })
}

/**
 * 根据供应商id和字典名称查询字典内容
 * @param {*} supplierId 供应商id
 * @param {*} name 字典名称  URL编码  
 */
export const getPolicyDictCategoryValueList = (supplierId, name) => {
  return axios.request({
    url: service + `/findDictValue/${supplierId}/${name}`,
    method: 'get'
  })
}

