import axios from '@/libs/api.request'

const controller = '/imNoticeMsg'

/**
 * 获取全部系统消息
 * @param {*} param0 
 */
export const getAllSystemMessage = ({page, size}) => {
  return axios.request({
    url: controller + `/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 根据Id获取系统消息
 * @param {*} param0 
 */
export const getMessageById = ({id}) => {
  return axios.request({
    url: controller + `/findById/${id}`,
    method: 'get'
  })
}

/**
 * 推送消息
 * @param {object} data 消息体对象
 */
export const sendMessage = (data) => {
  return axios.request({
    url: controller + `/push`,
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
    url: controller,
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
    url: controller + '/deleteById',
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
    url: controller + '/updateById',
    data,
    method: 'post'
  })
}
