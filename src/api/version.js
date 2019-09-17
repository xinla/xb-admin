import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.version

/**
 * 获取版本分页列表
 * @param {*} param0 
 */
export const getVersionPage = ({ page, size, type }) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: { type },
    method: 'get'
  })
}

/**
 * 根据ID获取版本的详细信息
 * @param {*} id 
 */
export const getVersionDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加/修改/删除版本
 * @param {Obj} data 版本对象
 */
export const saveVersion = (data) => {
  return axios.request({
    url: service + '/save',
    data,
    method: 'post'
  })
}
