import axios from 'axios'
import store from '@/store'
import { Spin, Message } from 'iview'
const addErrorLog = errorInfo => {
  const { data, statusText, status, request: { responseText, responseURL } } = errorInfo
  // let info = {
  //   type: 'ajax',
  //   code: status,
  //   mes: statusText,
  //   url: responseURL
  // }
  // if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
  process.env.NODE_ENV === 'development'
    ? Message.error({
      content: `错误: 路径: ${responseURL}, 返回值 : ${responseText}`,
      duration: 3
    })
    : Message.error({
      content: `${JSON.parse(responseText).message}`,
      duration: 3
    })
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      // console.log('request config: ' + JSON.stringify(config))
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // debugger
      // console.log('res: ' + res)
      const { data, status } = res
      // code 0:成功，-1/其它:错误
      if (status === 200 && data.code === 0) {
        return JSON.stringify(data.result) ? data.result : data.data
      } else if (data.code === 201) {
        Message.error({
          content: `产品已存在`,
          duration: 3
        })
      } else if (data.code === 300) {
        Message.error({
          content: `产品不存在`,
          duration: 3
        })
      } else if (data.code === 306) {
        Message.warning({
          content: `该产品信息未创建或未完成`,
          duration: 2
        })
      } else {
        addErrorLog(res)
      }
      if (process.env.NODE_ENV === 'development') {
        return Promise.reject(res) // 这样控制台会显示报错日志
      } else {
        return new Promise(() => {})
      }

    }, error => {
      this.destroy(url)
      if (error.response) {
        addErrorLog(error.response)
      } else {
        Message.error({
          content: `网络错误或服务器拒绝连接`,
          duration: 3
        })
      }
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
