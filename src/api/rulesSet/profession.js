import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.profession

/**
 * 通用数据库->职业代码表->上传
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
 * 通用数据库->查询所有职业代码
 * @param {string} path 必须 文件路径
 */
export const getProfessionPage = ({page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 通用数据库->职业代码表->修改
 */
export const updateProfession = (data) => {
  return axios.request({
    url: service + `/update`,
    method: 'post',
    data
  })
}



