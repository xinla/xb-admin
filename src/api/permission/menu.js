import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainPs + config.servicesPs.admin + '/menu'

/**
 * 获取后台首页菜单栏列表
 * @param {*} data 
 */
export const getSaaSMenu = () => {
  return axios.request({
    url: service,
    method: 'get'
  })
}

/**
 * 获取菜单列表
 */
export const getMenuTree = (roleId = '') => {
  return axios.request({
    url: service + `/tree/${roleId}`,
    method: 'get'
  })
}

/**
 * 获取菜单详情
 */
export const getMenuInfo = (menuId) => {
  return axios.request({
    url: service + `/${menuId}`,
    method: 'get'
  })
}

/**
 * 修改菜单
 * @param {*} data 
 */
export const updateMenu = (data) => {
  return axios.request({
    url: service,
    method: 'put',
    data
  })
}

/**
 * 增加一个菜单
 * @param {*} data 
 */
export const addMenu = (data) => {
  return axios.request({
    url: service,
    method: 'post',
    data
  })
}

/**
 * 删除一个菜单
 * @param {*} menuId 
 */
export const removeMenu = (menuId) => {
  return axios.request({
    url: service + `/${menuId}`,
    method: 'DELETE'
  })
}
