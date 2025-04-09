import type { AxiosInstance } from 'axios'

import Axios from 'axios'

import HttpCancelPlugin from './plugins/cancel-plugin'
import HttpLimitPlugin from './plugins/limit-plugin'

class Http {
  private instance = Axios.create()
  constructor() {}

  use = (...plugins: { install: (axios: AxiosInstance) => void }[]) => {
    plugins.forEach(plugin => plugin.install(this.instance))
    return this
  }
}

export default new Http()
  .use(new HttpCancelPlugin())
  .use(new HttpLimitPlugin(4))
