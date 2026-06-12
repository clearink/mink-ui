import type { VoidFn } from '@mink-ui/shared/interface'
import type { ModalGlobalMethods, ModalMethodReturn, ModalVariantMethods } from '../_shared.props'
import type { ModalContainerInstance } from '../modal-container.props'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { nextTick } from '@mink-ui/shared/dom/raf'
import { isThenable } from '@mink-ui/shared/is/is-promise'

import { getBuiltinStatus } from '../../../_shared/utils/status'
import { withResolvers } from '../../../_shared/utils/with-resolvers'
import ModalContainer from '../modal-container'
import { globalModalConfig } from './singleton-config'

/**
 * @description 全局模态框控制器
 */
class GlobalModalControl {
  private _cleanup: VoidFn | null = null

  private _container: ModalContainerInstance | null = null

  private _callbacks: ((container: ModalContainerInstance) => void)[] = []

  /**
   * @description 确保 ModalContainer 存在
   */
  private ensure = () => {
    if (this._container) return this._container

    return new Promise<ModalContainerInstance>((resolve) => {
      createRoot(document.createDocumentFragment()).render(
        <StrictMode>
          <ModalContainer ref={(el) => { resolve(this._container ??= el!) }} />
        </StrictMode>,
      )
    })
  }

  /**
   * @description 清理
   */
  private clear = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 执行所有回调函数
   */
  private flush = () => {
    this.clear()

    this._cleanup = nextTick(() => {
      const result = this.ensure()

      const handler = (container: ModalContainerInstance) => {
        container.sync()

        this._callbacks.forEach((fn) => { fn(container) })

        this._callbacks.length = 0
      }

      isThenable(result) ? result.then(handler) : handler(result)
    })
  }

  /**
   * @description 更新配置
   */
  private config: ModalGlobalMethods['config'] = (config) => {
    globalModalConfig.set(config)

    this._container?.sync()
  }

  /**
   * @description 打开弹窗
   */
  private confirm: ModalGlobalMethods['confirm'] = (params) => {
    const { promise, resolve } = withResolvers<{ inner: ModalMethodReturn }>()

    this._callbacks.push((container) => { resolve({ inner: container.confirm(params) }) })

    this.flush()

    return {
      then: callback => promise.then(({ inner }) => { inner.then(callback) }),
      update: (config) => { promise.then(({ inner }) => { inner.update(config) }) },
      close: () => { promise.then(({ inner }) => { inner.close() }) },
    }
  }

  /**
   * @description 向外暴露方法
   */
  public expose = (): ModalGlobalMethods => {
    const { confirm, config } = this

    return Object.assign(
      getBuiltinStatus().reduce((result, status) => {
        result[status] = params => confirm({ ...params, type: status })
        return result
      }, {} as ModalVariantMethods),
      { confirm, config },
    )
  }
}

export const globalModalControl = new GlobalModalControl()
