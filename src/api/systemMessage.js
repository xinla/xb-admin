import axios from '@/libs/api.request'
import config from '@/config/index'

const service = config.services.systemMessage

/**
 * 获取全部系统消息
 * @param {*} param0 
 */
export const getSystemMessagePage = ({page, size}) => {
  return axios.request({
    url: service + `/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 根据Id获取系统消息
 * @param {*} param0 
 */
export const getMessageById = ({id}) => {
  return axios.request({
    url: service + `/findById/${id}`,
    method: 'get'
  })
}

/**
 * 推送消息
 * @param {object} data 消息体对象
 */
export const sendMessage = (data) => {
  return axios.request({
    url: service + `/push`,
    data,
    method: 'post'
  })
}

/**
 * 添加系统消息模板
 * @param {object} data 消息体对象
 */
export const addMessageTemplate = (data) => {
  return axios.request({
    url: service,
    data,
    method: 'post'
  })
}

/**
 * 根据消息id删除消息模板
 * @param {object} data 消息体对象
 */
export const deleteMessageTemplateById = (data) => {
  return axios.request({
    url: service + '/deleteById',
    data,
    method: 'post'
  })
}
/**
 * 根据消息id更新消息模板
 * @param {*} data 消息体对象
 */
export const updateMessageTemplateById = (data) => {
  return axios.request({
    url: service + '/updateById',
    data,
    method: 'post'
  })
}
