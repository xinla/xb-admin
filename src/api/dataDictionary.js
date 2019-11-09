import axios from '@/libs/api.request'
import config from '@/config'

const service = config.baseUrl.domainV2 + config.services.dataDitionary

/**
 * 保存
 * @param {*} data 
 */
export const saveDataDitionary = (data) => {
  return axios.request({
    url: service + `/save`,
    method: 'post',
    data,
  })
}

/**
 * 删除
 * @param {*} data 
 */
export const deleteDataDitionary = (data) => {
  return axios.request({
    url: service + `/deleteById`,
    method: 'post',
    data: {
      result: data
    },
  })
}

/**
 * 查询所有字典
 * @param {*} params 键和值的模糊查询
 */
export const getDataDitionary = ({keyword, page, size}) => {
  return axios.request({
    url: service + `/findAll/${page}/${size}`,
    method: 'get',
    params: {
      params: keyword,
    },
  })
}

/**
 * 获取数据库所有表名和表名注释
 * @param {*} params 
 */
export const getDataDitionaryTableAndComment = (params) => {
  return axios.request({
    url: service + `/tableAndComment`,
    method: 'get',
    params: {
      params,
    },
  })
}

/**
 * 根据表名获取字段和备注
 * @param {*} params 
 */
export const getDataDitionaryFiledAndComment = (params) => {
  return axios.request({
    url: service + `/filedAndComment`,
    method: 'get',
    params: {
      params,
    },
  })
}

/**
 * 获取所有品牌
 * @param {*} params 
 */
export const getDataDitionarySupplier = (params) => {
  return axios.request({
    url: service + `/findSupplier`,
    params: {
      params,
    }
  })
}
/**
 * 获取所有租户
 * @param {*} params 
 */
export const getDataDitionaryCompany = (params) => {
  return axios.request({
    url: service + `/findCompany`,
    params: {
      params,
    }
  })
}

/**
 * 查询所有数据字典项目
 * @param {*} dictId 
 */
export const getAllDitionaryItem = (dictId) => {
  return axios.request({
    url: service + `Item/list`,
    params: {
      pageSize: 1000,
      pageNum: 1,
      dictId
    }
  })
}

/**
 * 新增或者修改数据字典项目
 * @param {*} data 
 */
export const saveDitionaryItem = (data) => {
  return axios.request({
    url: service + `Item/saveOrUpdate`,
    method: 'post',
    data
  })
}

/**
 * 修改数据字典项目上移下移
 * @param {*} data 
 */
export const sortDitionaryItem = (data) => {
  return axios.request({
    url: service + `Item/sortItem`,
    method: 'post',
    data
  })
}

/**
 * 删除数据字典项目
 * @param {*} id 
 */
export const deleteDitionaryItem = (id) => {
  return axios.request({
    url: service + `Item/delete/${id}`,
    method: 'post',
  })
}
