import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.profession
/**
 * 通用数据库->职业代码表->导入
 * @param {string} path 必须 文件路径
 */
export const importProfessionTable = (path) => {
  return axios.request({
    url: service + `/import`,
    data: {
      path,
    },
    method: 'post'
  })
}

/**
 * 通用数据库->职业代码表->导出
 * @param {string} path 必须 文件路径
 */
export const exportProfessionTable = (path) => {
  return axios.request({
    url: service + `/export`,
    data: {
      path,
    },
    method: 'post'
  })
}

/**
 * 通用数据库->职业代码表->下载
 */
export const downloadProfessionTable = () => {
  return axios.request({
    url: service + `/downloadExcel`,
    method: 'get'
  })
}



