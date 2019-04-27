import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.system

/**
 * 增加系统设置记录
 * @param {Obj} data 系统设置记录对象
 */
export const addSystemSet = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

/**
 * 获取系统设置分页列表
 * @param {*} param0 
 */
export const getSystemSetPage = ({page, size}) => {
  return axios.request({
    url: service + `/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 根据id修改系统设置
 * @param {Number} data 
 */
export const modifySystemSetById = (data) => {
  return axios.request({
    url: service + `/${data.id}`,
    data,
    method: 'post'
  })
}

/**
 * 根据id获取系统设置详情
 * @param {Number} id 
 */
export const getSystemSetById = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}
