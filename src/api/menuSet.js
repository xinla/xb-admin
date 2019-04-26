import axios from '@/libs/api.request'

const controller = '/xbBasePermissionMenu'

/**
 * 获取全部菜单
 */
export const getAllMenu = () => {
  return axios.request({
    url: controller + `/findAll/tree`,
    method: 'get'
  })
}

/**
 * 获取菜单分页
 * @param {*} param0 
 */
export const getMenuPage = ({page, size, id, businessType, classify, isVo, name}) => {
  return axios.request({
    url: controller + `/findAll/${page}/${size}`,
    params: {
      id, businessType, classify, isVo, name
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
    url: controller + `/update`,
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
    url: controller + `/save`,
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
    url: controller + `/delete/${id}`,
    method: 'post'
  })
}
