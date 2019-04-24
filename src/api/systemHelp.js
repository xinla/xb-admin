import axios from '@/libs/api.request'

const controller = '/xbSystemHelp'
const controllerSub = 'http://192.168.1.21:8115/v1/systemHelp'

/**
 * 获取帮助分页列表
 * @param {*} param0 
 */
export const getHelpPage = ({page, size}) => {
  return axios.request({
    url: controllerSub + `/list/${page}/${size}`,
    method: 'get'
  })
}

/**
 * 根据ID获取帮助的详细信息
 * @param {*} id 
 */
export const getHelpById = (id) => {
  return axios.request({
    url: controllerSub + `/get`,
    params: {
      id
    },
    method: 'get'
  })
}

/**
 * 增加帮助
 * @param {Obj} data 帮助对象
 */
export const addHelp = (data) => {
  return axios.request({
    url: controller + '/save',
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
    url: controller + '/update',
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
    url: controller + `/delete/${id}`,
    method: 'post'
  })
}

/**
 * 获取帮助分类
 */
export const getHelpClassify = () => {
  return axios.request({
    url: controller + `/findClassify`,
    method: 'get'
  })
}
