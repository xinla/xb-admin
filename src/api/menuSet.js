import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.menuSet

/**
 * 获取全部菜单
 */
export const getAllMenu = () => {
  return axios.request({
    url: service + `/findAll/tree`,
    method: 'get'
  })
}

/**
 * 获取菜单分页
 * @param {*} id id
 * @param {*} type 2:保险,1:总后台,0:信贷,3:基金
 * @param {*} classify 菜单类型,0菜单,1按钮
 * @param {*} isVo 0 可见,1不可见
 * @param {*} name 菜单名称 必传
 */
export const getMenuPage = ({page, size, id, type, classify, isVo, name}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      id, type, classify, isVo, name
    },
    method: 'get'
  })
}

/**
 * 更新菜单
 * @param {Object} data 菜单体对象
 */
export const modifyMenu = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 添加菜单
 * @param {Object} data 菜单体对象
 */
export const addMenu = (data) => {
  return axios.request({
    url: service + `/save`,
    data,
    method: 'post'
  })
}

/**
 * 根据菜单id删除菜单
 * @param {Number} id 菜单id
 */
export const deleteMenu = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'post'
  })
}
