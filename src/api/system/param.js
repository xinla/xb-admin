import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainPs + config.servicesPs.param

/**
 * 
 * @param {*} query 
 */
export function fetchList(query) {
  return axios.request({
    url: service + '/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return axios.request({
    url: service + `/${id}`,
    method: 'delete'
  })
}

export function addObj(obj) {
  return axios.request({
    url: service,
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

export function putObj(obj) {
  return axios.request({
    url: service,
    method: 'put',
    data: obj
  })
}
