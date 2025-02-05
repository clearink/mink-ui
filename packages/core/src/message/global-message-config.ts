class GlobalMessageConfig {
  private config = { }

  get = () => {
    return { ...this.config }
  }

  set = (config) => {
    this.config = config
  }
}

export default new GlobalMessageConfig()
