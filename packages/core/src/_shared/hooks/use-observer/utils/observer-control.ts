import type { MayBe, VoidFn } from '@mink-ui/shared/interface'

import { resizeMonitor as monitor } from './singleton'

export class ObserverControl<T extends Element> {
  public cleanup: VoidFn | null = null

  public element = null as MayBe<T>

  /**
   * @description 订阅全局 resize 监听器
   */
  public subscribe = () => monitor.subscribe()

  /**
   * @description 监听
   */
  public observe = (element: MayBe<T>, callback: (el: Element) => void) => {
    this.clear()

    this.element = element

    this.cleanup = element ? monitor.activate(element, callback) : null
  }

  /**
   * @description 清理
   */
  public clear = () => {
    this.cleanup?.()

    this.cleanup = null
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.clear()

    this.element = null
  }
}
