import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.company

/**
 * 根据公司查询全部租户
 * @param {*} page 
 * @param {*} size 
 * @param {*} name 公司名
 */
export const getLesseePage = ({page, size, name}) => {
  return axios.request({
    url: service + `/${page}/${size}`,
    params: {
      name
    },
    method: 'get'
  })
}

/**
 * getLesseeById
 */
export const getLesseeById = (id) => {
  return axios.request({
    url: service + `/${id}`,
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
export const getLesseePageByJB = ({page, size, type, name, provinceName, areaName}) => {
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
 * 租户停用/启用
 * @param {*} id 租户id
 * @param {*} state 0启用->1禁用
 */
export const setState = (id, state) => {
  return axios.request({
    url: service + `/${id}/${state}`,
    method: 'put',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 添加租户
 * @param {*} id 经代公司id
 * @param {*} company 租户信息
 */
export const addLessee = (id, company) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'post',
    data: company
  })
}

/**
 * 修改租户
 * @param {*} id 租户id
 */
export const editLessee = (id, company) => {
  return axios.request({
    url: service + `/${id}`,
    data: company,
    method: 'put'
  })
}

/**
 * 添加超级管理员
 * @param {uname, mobile, rname} role 管理员信息
 */
export const addAdmin = (role) => {
  return axios.request({
    url: service + `/saveRole`,
    data: role,
    method: 'post'
  })
}

/**
 * 添加体验账号
 * @param {uname, mobile, rname, pname, invaTimeStart, invaTimeEnd} user 
 */
export const addServiceAccount = (user) => {
  return axios.request({
    url: service + `/saveNumber`,
    data: user,
    method: 'post'
  })
}

/**
 * 查询超级管理员
 * @param {*} page 
 * @param {*} size 
 */
export const searchRole = (page, size) => {
  return axios.request({
    url: service + `/findNumber/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 租户工商信息
 * @param {*} id 租户id
 */
export const getLesseeBusinessInfoById = (id) => {
  return axios.request({
    url: service + `/BusinessInformation/findAll/${id}`,
    method: 'get'
  })
}

/**
 * 租户品牌信息
 * @param {*} id 租户id
 */
export const getLesseeBrandInfoById = (id) => {
  return axios.request({
    url: service + `/findBrand/${id}`,
    method: 'get'
  })
}
