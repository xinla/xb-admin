import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.systemHelp

/**
 * 获取帮助分页列表
 * @param {*} param0 
 */
export const getHelpPage = ({page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 根据ID获取帮助的详细信息
 * @param {*} id 
 */
export const getHelpById = (id) => {
  return axios.request({
    url: service + `/${id}`,
    method: 'get'
  })
}

/**
 * 增加帮助
 * @param {Obj} data 帮助对象
 */
export const addHelp = (data) => {
  return axios.request({
    url: service + '/save',
    data,
    method: 'post'
  })
}

/**
 * 修改帮助
 * @param {Obj} data 帮助对象
 */
export const modifyHelp = (data) => {
  return axios.request({
    url: service + '/update',
    data,
    method: 'post'
  })
}

/**
 * 根据Id删除帮助
 * @param {Number} id 帮助ID
 */
export const deleteHelpById = (id) => {
  return axios.request({
    url: service + `/delete/${id}`,
    method: 'post'
  })
}

/**
 * 获取帮助分类
 */
export const getHelpClassify = () => {
  return axios.request({
    url: service + `/findClassify`,
    method: 'get'
  })
}

/**
 * 反馈保存
 * @param {*} data 
 */
export const saveFeedback = (data) => {
  return axios.request({
    url: service + `/feedBack/save`,
    method: 'post',
    data,
  })
}

/**
 * 查询所有反馈
 * @param {*} param0 
 */
export const getFeedbackPage = ({page, size, status, type}) => {
  return axios.request({
    url: service + `/feedBack/findAll/${page}/${size}`,
    params: {
      status, type
    },
    method: 'get'
  })
}

/**
 * 获取反馈详情
 * @param {*} id 
 */
export const getFeedbackDetail = (id) => {
  return axios.request({
    url: service + `/feedBack/${id}`,
    method: 'get'
  })
}

/**
 * 批处理
 * @param {*} status 0 未处理  1已处理 2已关闭
 * @param {*} isDelete 是否删除  0 未删除.  1已删除
 */
export const multSaveFeedback = (data, status, isDelete) => {
  return axios.request({
    url: service + `/feedBack/dispose`,
    method: 'POST',
    params: {
      status, isDelete
    },
    data: {
      json: data
    }
  })
}
