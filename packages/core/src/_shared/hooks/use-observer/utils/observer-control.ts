import type { MayBe, VoidFn } from '@mink-ui/shared/interface'

import { resizeMonitor as monitor } from './singleton'

export class ObserverControl<T extends Element> {
  private _cleanup: VoidFn | null = null

  public element = null as MayBe<T>

  /**
   * @description 执行清理函数
   */
  private dispose = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 订阅全局 resize 监听器
   */
  public subscribe = () => monitor.subscribe()

  /**
   * @description 监听
   */
  public observe = (element: MayBe<T>, callback: (el: Element) => void) => {
    this.dispose()

    this.element = element

    this._cleanup = element ? monitor.activate(element, callback) : null
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.dispose()

    this.element = null
  }
}
