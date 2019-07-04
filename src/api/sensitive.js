import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.sensitive

/**
 * 获取敏感词分页列表
 * @param {*} param0 
 */
export const getSensitivePage = ({sensitiveWord, page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      sensitiveWord
    },
    method: 'get'
  })
}

/**
 * 根据ID获取敏感词的详细信息
 * @param {*} id 
 */
export const getSensitiveDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加/修改/敏感词
 * @param {Obj} data 敏感词对象
 */
export const saveSensitive = (data) => {
  return axios.request({
    url: service + '/saveAndUpdate',
    data,
    method: 'post'
  })
}

/**
 * 批量删除敏感词
 * @param {Array} data 敏感词对象数组
 */
export const deleteSensitive = (data) => {
  return axios.request({
    url: service + '/delete',
    data,
    method: 'post'
  })
}
