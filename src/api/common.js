import axios from 'axios'
import config from '@/config'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})
/**
 * 获取行政区划
 * @param {*} subdistrict 省市区街道，层级
 * @param {*} keywords 关键词
 */
export const getDistrict = (subdistrict=2, keywords=100000) => {
  return axios.request({
    url: 'https://restapi.amap.com/v3/config/district',
    params: {
      key: '5f70e232462daa68522e88bc11193c93',
      keywords,
      subdistrict,
    },
    method: 'get',
    transformResponse: [function (data) {
      data = JSON.parse(data)
      return data.districts[0].districts;
    }]
  })
}

/**
 * 根据地址查找邮编
 * @param {*} address 地址
 */
export const getPostcode = (address) => {
  return axios.request({
    url: 'http://192.168.1.150:8888/api/base/v1/util/getPostCode',
    params: {
      address,
    },
    method: 'get',
    // transformResponse: [function (res) {
    //   return res.data;
    // }]
  })
}
