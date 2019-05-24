import axios from '@/libs/api.request'
import config from '@/config'

const service = config.services.insurance

export const getPolicyDictCategoryDetail = (id, name) => {
  return axios.request({
    url: service + `/findById/${id}`,
    params: {
      name
    },
    method: 'get'
  })
}
