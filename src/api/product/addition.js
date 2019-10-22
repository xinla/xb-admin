import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainV2A + config.servicesV2.product + '/addition'
const service1 = config.baseUrl.domainV2A + config.servicesV2.product
/**
 * 保存附加险规则
 * @param {*} data 产品附加险对象
 */
export const saveAdditionRisk = (data) => {
  return axios.request({
    url: service + `/save`,
    data,
    method: 'post'
  })
}

/**
 * 根据id查询产品附加险
 * @param {*} id 产品主键id
 */
export const getAdditionRisk = (id) => {
  return axios.request({
    url: service + `/queryRider/${id}`,
    method: 'get'
  })
}

/**
 * 修改附加险规则
 * @param {*} data 产品附加险对象
 */
export const updateAdditionRisk = (data) => {
  return axios.request({
    url: service + `/update`,
    data,
    method: 'post'
  })
}

/**
 * 清空保险规则
 * @param {*} id 保险规则主键id
 */
export const deleteAdditionRisk = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'post'
  })
}

/**
 * 查询保险期间约束数据
 * @param {*} mainRiskId 主险产品id
 * @param {*} riderRiskId 附加险产品id
 * @param {*} type 1  查询可选  2  查询费率作为条件
 */
export const getInsurancePeriodConstraint = (mainRiskId, riderRiskId, type) => {
  return axios.request({
    url: service + `/queryInsurancePeriod/${mainRiskId}/${riderRiskId}/${type}`,
    method: 'get'
  })
}

/**
 * 查询附加险列表
 * @param {*} id 品牌id
 */
export const getAdditionRiskList = (id) => {
  return axios.request({
    url: service1 + `/queryProductBySid/${id}/1`,
    method: 'get'
  })
}
