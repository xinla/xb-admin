import axios from '@/libs/api.request'
import config from '@/config'

import qs from 'qs'

const service = config.services.company
const serviceBusinessInformation = config.services.businessInformation
let serviceSub = config.services.saas

serviceSub = (process.env.NODE_ENV === 'development' ? config.baseUrl.dev1 : config.baseUrl.pro1) + serviceSub

/**
 * 根据公司查询全部租户
 * @param {*} page 
 * @param {*} size 
 * @param {*} name 供应商名称
 */
export const getLesseePage = ({ page, size, name }) => {
  return axios.request({
    url: service + `/${page}/${size}`,
    params: {
      name
    },
    method: 'get'
  })
}

/**
 * 租户详情查询
 */
export const getLesseeDetail = (id) => {
  return axios.request({
    url: serviceSub + `/getCompanyInfo`,
    params: {
      companyId: id
    },
    method: 'get'
  })
}

/**
 * 租户管理 模糊查询经代/保险公司
 * @param {*} page 
 * @param {*} size 
 * @param {*} type 1是经代,0是保险
 * @param 公司 name 经代/保险公司名
 */
export const getLesseePageByJB = ({ page, size, type, name, provinceName, areaName }) => {
  return axios.request({
    url: service + `/jdFindAll/${page}/${size}`,
    data: {
      type,
      name,
      provinceName: provinceName || '',
      areaName: areaName || ''
    },
    method: 'post',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 租户停用/启用/删除
 * @param {*} id 租户id
 * @param {*} state 0:删除（删除需在停用状态下）1:停用2:启用
 */
export const setState = (id, state) => {
  return axios.request({
    url: serviceSub + `/updateCompanyState`,
    data: {
      companyId: id,
      state
    },
    method: 'put',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        if (data[it] != undefined) {
          ret += it + '=' + data[it] + '&'
        }
      }
      return ret
    }],
  })
}

/**
 * 添加租户
 * @param {*} id 经代公司id
 * @param {*} company 租户信息
 */
export const addLessee = (data) => {
  return axios.request({
    url: serviceSub + `/insertCompany`,
    method: 'post',
    data
  })
}

/**
 * 修改租户
 * @param {*} id 租户id
 */
export const updateLessee = (data) => {
  return axios.request({
    url: serviceSub + `/updateCompany`,
    data,
    method: 'put',
  })
}

/**
 * 添加超级管理员
 * @param {uname, mobile, rname} role 管理员信息
 */
// export const addAdmin = (role) => {
//   return axios.request({
//     url: service + `/saveRole`,
//     data: role,
//     method: 'post'
//   })
// }

/**
 * 添加体验账号
 * @param {uname, mobile, rname, pname, invaTimeStart, invaTimeEnd} user 
 */
// export const addServiceAccount = (user) => {
//   return axios.request({
//     url: service + `/saveNumber`,
//     data: user,
//     method: 'post'
//   })
// }

/**
 * 查询超级管理员
 * @param {*} page 
 * @param {*} size 
 */
export const getRoles = ({ page, size, companyId }) => {
  return axios.request({
    url: service + `/findNumber/${page}/${size}`,
    params: {
      companyId,
    },
    method: 'get'
  })
}

/**
 * 租户管理->查询默认的角色组和角色
 * @param {*} 公司名 
 */
export const getRolesAndGroups = (name) => {
  return axios.request({
    url: service + `/rolesAndGroups`,
    params: {
      name,
    },
    method: 'get'
  })
}

/**
 * 获取体验账号
 * @param {*} name 
 */
export const getInvaNumber = ({ page, size, companyId }) => {
  return axios.request({
    url: service + `/findInvaNumber/${page}/${size}`,
    params: {
      companyId,
    },
    method: 'get'
  })
}

/**
 * 租户工商信息
 * @param {*} id 租户id
 */
export const getLesseeBusinessInfoById = (id) => {
  return axios.request({
    url: serviceBusinessInformation + `/findAll/${id}`,
    method: 'get'
  })
}

/**
 * 获取保险/经代公司工商信息
 * @param {*} id 
 */
export const getCompanyBusinessInformation = (id) => {
  return axios.request({
    url: serviceBusinessInformation + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加/修改 保险/经代公司工商信息
 * @param {*} data 
 */
export const saveCompanyBusinessInformation = (data) => {
  return axios.request({
    url: serviceBusinessInformation,
    data,
    method: 'post'
  })
}

/**
 * 删除 保险/经代公司工商信息
 * @param {*} data 
 */
export const deleteCompanyBusinessInformation = (data) => {
  return axios.request({
    url: serviceBusinessInformation + '/delete',
    data,
    method: 'post'
  })
}

/**
 * 租户品牌信息
 * @param {*} id 租户id
 */
export const getLesseeBrandInfoById = (id) => {
  return axios.request({
    url: service + `/getOneCompany/${id}`,
    method: 'get',
  })
}

// /**
//  * 修改公司品牌信息
//  * @param {object} data 公司品牌信息对象
//  */
// export const updateLessee = (data) => {
//   return axios.request({
//     url: serviceSub + `/updateById`,
//     data,
//     transformRequest: [function (data) {
//       let ret = ''
//       for (let it in data) {
//         if (data[it]) {
//           ret += it + '=' + data[it] + '&'
//         }
//       }
//       return ret
//     }],
//     method: 'post',
//   })
// }

