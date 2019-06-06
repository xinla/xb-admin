import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.proposal

/**
 * 查询所有建议书
 * @param {*} type 是  0是标题库,1是封面库  
 * @param {*} classifyId 否   分类id 
 * @param {*} param0 
 */
export const getProposalPage = ({page, size, type, classifyId}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    params: {
      type, classifyId
    },
    method: 'get'
  })
}

/**
 * 增加/修改建议书
 * @param {*} data 
 */
export const saveProposal = (data) => {
  return axios.request({
    url: service + `/save`,
    data,
    method: 'post'
  })
}

/**
 * 查询所有字典
 * @param {*} param0 
 */
export const getProposalDictPage = ({page, size}) => {
  return axios.request({
    url: service + `/dict/findAll/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 增加/修改 字典
 * @param {*} data 
 */
export const saveProposalDict = (data) => {
  return axios.request({
    url: service + `/dict/save`,
    data,
    method: 'post'
  })
}

/**
 * 删除建议书
 * @param {*} id 
 */
export const deleteProposal = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'post'
  })
}
