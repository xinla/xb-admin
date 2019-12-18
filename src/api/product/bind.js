import axios from '@/libs/api.request'
import config from '@/config'

const service = config.servicesV2.product + '/bind'
/**
 * 修改或者新增捆绑规则
 * @param {*} data 产品附加险对象
 */
export const saveBind = (data) => {
  return axios.request({
    url: service + `/saveOrUpdate`,
    data,
    method: 'post'
  })
}

/**
 * 产品id查询捆绑产品列表
 * @param {*} id 产品id
 */
export const getBindList = (id) => {
  return axios.request({
    url: service + `/list/${id}`,
    method: 'get'
  })
}

/**
 * 主键查询捆绑规则
 * @param {*} id 捆绑规则主键id
 */
export const getBind = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 删除捆绑规则
 * @param {*} id 捆绑规则主键id
 */
export const deleteBind = (id) => {
  return axios.request({
    url: service + `/delete`,
    data: [id],
    method: 'post'
  })
}
