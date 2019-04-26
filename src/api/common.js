import axios from 'axios'
const url = 'https://restapi.amap.com/v3/config/district'

export const getDistrict = (subdistrict=2, keywords=100000) => {
  return axios.request({
    url,
    params: {
      key: '500a3ef03541f06fac2f747c4ad81ecf',
      keywords,
      subdistrict,
    },
    method: 'get'
  })
}
