import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.menuSet

/**
 * 获取全部菜单
 */
export const getAllMenu = ({id, type, classify, name}) => {
  return axios.request({
    url: service + `/findAll/tree`,
    params: {
      id, type, classify, name
    },
    method: 'get'
  })
}

/**
 * 获取菜单分页
 * @param {*} id id
 * @param {*} type 2: 业务类型2:保险,1:Saas,0:信贷,3:基金 必传
 * @param {*} classify 菜单类型,0菜单,1操作,2目录,3应用
 * @param {*} isVo 0 可见,1不可见
 * @param {*} name 菜单名称 
 */
export const getMenuPage = ({page, size, id, type, classify, name}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      id, type, classify, name
    },
    method: 'get'
  })
}

// /**
//  * 更新菜单
//  * @param {Object} data 菜单体对象
//  */
// export const modifyMenu = (data) => {
//   return axios.request({
//     url: service + `/update`,
//     data,
//     method: 'post'
//   })
// }

/**
 * 添加/更新菜单
 * @param {Object} data 菜单体对象
 */
export const saveMenu = (data) => {
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
