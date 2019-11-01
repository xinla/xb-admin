import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.domainCKF + config.servicesV2.saas

/**
 * 查询菜单
 * @param {*} type 业务类型   2:保险,1:Saas,0:信贷,3:基金;4:理财
 * @param {*} id 父级Id  传id表示查询此id下所有子菜单
 */
export const getMenuList = (type, id) => {
  return axios.request({
    url: service + `/getMenu`,
    params: {
      type, id
    },
    method: 'get'
  })
}

export const getOperationList = (id) => {
  return axios.request({
    url: service + `/getMenu`,
    params: {
      id
    },
    method: 'get'
  })
}

/**
 * 查询应用
 * @param {*} keywords 名称模糊匹配
 * @param {*} page 默认1   页数
 * @param {*} size 默认10  页大小  
 * @param {*} pid 菜单Id 不传表示查所有  传值表示查询该菜单下所有应用 
 */
export const getApplicationPage = ({ keywords, page, size = 100, pid }) => {
  return axios.request({
    url: service + `/getApplication`,
    params: {
      param: keywords,
      index: page,
      size,
      pid
    },
    method: 'get'
  })
}

/**
 * 根据菜单id查询可添加应用列表 
 * @param {*} menuId 菜单id
 */
export const getApplicationListByMenuId = (menuId) => {
  return axios.request({
    url: service + `/getApplicationListByMenuId`,
    params: {
      menuId,
    },
    method: 'get'
  })
}

/**
 * 新增菜单/应用/操作
 * @param {*} data 
 */
export const addMenu = (data) => {
  return axios.request({
    url: service + `/addMenu`,
    data,
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it] != undefined) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}

/**
 * 删除菜单/应用/操作
 * @param {*} ids 1,2,3 id集合   可单个
 * @param {*} classify 菜单类型,0菜单,1操作,2目录,3应用
 */
export const deleteMenu = (ids, classify) => {
  return axios.request({
    url: service + `/deleteMenu`,
    data: {ids, classify},
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it] != undefined) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}

/**
 * 移出应用
 * @param {*} ids 1,2,3 id集合   可单个
 */
export const deleteApp = (ids) => {
  return axios.request({
    url: service + `/removeMenu`,
    data: {ids},
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it] != undefined) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}

/**
 * 编辑菜单/应用/操作
 * @param {*} ids 
 */
export const updateMenu = (data) => {
  return axios.request({
    url: service + `/updateMenu`,
    data,
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it] != undefined) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}

/**
 * 上移、下移应用
 * @param {*} beginId 被移动id
 * @param {*} endId 交换id
 */
export const moveApp = (beginId, endId) => {
  return axios.request({
    url: service + `/moveMenu`,
    data: {beginId, endId},
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it] != undefined) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}

/**
 * 根据id查询菜单/应用/操作
 * @param {*} id 菜单/应用/操作 id
 */
export const getMenuDetail = (id) => {
  return axios.request({
    url: service + `/getMenuById`,
    params: {id},
    method: 'get'
  })
}

/**
 * 菜单添加应用
 * @param {*} menuId * 菜单id
 * @param {*} applicatonIds * 应用id 数组 1,2,3
 */
export const saveApplicationForMenu = (menuId, applicatonIds) => {
  return axios.request({
    url: service + `/saveApplicationForMenu`,
    data: {menuId, applicatonIds},
    method: 'post',
    transformRequest: [function (data) {
      let _data = ''
      for (let it in data) {
        if (data[it] != undefined) {
          _data += it + '=' + data[it] + '&'
        }
      }
      return _data
    }],
  })
}
