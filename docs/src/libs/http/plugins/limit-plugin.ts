import type { AxiosInstance } from 'axios'

export default class HttpLimitPlugin {
  constructor(private limit: number) {
  }

  install = (instance: AxiosInstance) => {
    this.requestIntercept(instance)
    this.responseIntercept(instance)
  }

  private requestIntercept = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
      config.cancelToken = new instance.CancelToken((cancel) => {
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
