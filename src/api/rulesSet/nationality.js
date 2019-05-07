import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.nationality

/**
 * 通用数据库->查询国籍表
 * @param {*} page 
 * @param {*} size 
 */
export const nationalityTable = (page=1, size=100) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    method: 'get'
  })
}