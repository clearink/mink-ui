import type { MayBe, VoidFn } from '@mink-ui/shared/interface'

import { makeTimeout } from '@mink-ui/shared/dom/timer'

import { clickSubject as subject } from '../../../_shared/hooks/use-window-click/utils/singleton'

/**
 * @description 全局模态框点击追踪
 */
class GlobalPointerTracker {
  private _cleanup: VoidFn | null = null

  public position: MayBe<{ x: number, y: number }> = undefined

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

    this._cleanup?.()

    // 超过 100ms 则重置
    this._cleanup = makeTimeout(200, () => { this.position = undefined })
  }

  public subscribe = () => {
    subject.subscribe()

    subject.activate(true, this.sync)
  }
}

export const globalPointerTracker = new GlobalPointerTracker()
