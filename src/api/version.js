import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.version

/**
 * 获取帮助分页列表
 * @param {*} param0 
 */
export const getVersionPage = ({page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 根据ID获取帮助的详细信息
 * @param {*} id 
 */
export const getVersionDetail = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加/修改/删除帮助
 * @param {Obj} data 帮助对象
 */
export const saveVersion = (data) => {
  return axios.request({
    url: service + '/save',
    data,
    method: 'post'
  })
}
