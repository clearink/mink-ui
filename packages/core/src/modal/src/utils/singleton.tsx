import type { MayBe, VoidFn } from '@mink-ui/shared/interface'
import type { ModalConfig, ModalGlobalMethods, ModalMethodReturn, ModalVariantMethods } from '../_shared.props'
import type { ModalContainerInstance } from '../modal-container.props'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { nextTick } from '@mink-ui/shared/dom/raf'
import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { isThenable } from '@mink-ui/shared/is/is-promise'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { clickSubject as subject } from '../../../_shared/hooks/use-window-click/utils/singleton'
import { getBuiltinStatus } from '../../../_shared/utils/status'
import { withResolvers } from '../../../_shared/utils/with-resolvers'
import { defaultModalConfig } from '../_shared.props'
import ModalContainer from '../modal-container'

/**
 * @description 全局模态框点击追踪
 */
class GlobalPointerTracker {
  private _cleanup: VoidFn | null = null

  public position: MayBe<{ x: number, y: number }> = undefined

  private clear = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 同步
   */
  private sync = (e: MouseEvent) => {
    const element = e.target as HTMLElement | null

    const keyboard = e.detail === 0 || (!e.pageX && !e.pageY)

    const rect = keyboard && element ? element.getBoundingClientRect() : null

    // 获取到屏幕左上角的距离
    if (!rect && keyboard) this.position = undefined
    else if (!rect) this.position = { x: e.clientX, y: e.clientY }
    else this.position = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }

    this.clear()

    // 超过 100ms 则重置
    this._cleanup = makeTimeout(200, () => { this.position = undefined })
  }

  public subscribe = () => {
    subject.subscribe()

    subject.activate(true, this.sync)
  }
}

export const globalPointerTracker = new GlobalPointerTracker()

/**
 * @description 全局模态框配置
 */
class GlobalModalConfig {
  private _config: ModalConfig = { ...defaultModalConfig }

  public get = (): ModalConfig => {
    return { ...this._config }
  }

  public set = (config: Partial<ModalConfig>) => {
    this._config = shallowMerge(config, this.get())
  }
}

export const globalModalConfig = new GlobalModalConfig()

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
