import type { AxiosInstance } from 'axios'

import Axios from 'axios'

export default class HttpCancelPlugin {
  install = (instance: AxiosInstance) => {
    this.requestIntercept(instance)
    this.responseIntercept(instance)
  }

  private requestIntercept = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
      config.cancelToken = new Axios.CancelToken((cancel) => {
        // 这里可以做一些操作
        cancel('cancel')
      })

      return config
    })
  }

  private responseIntercept = (instance: AxiosInstance) => {
    instance.interceptors.response.use((response) => {
      // 这里可以做一些操作
      return response
    })
  }
}
