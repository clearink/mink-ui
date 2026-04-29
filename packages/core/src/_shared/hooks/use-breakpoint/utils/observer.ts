import type { VoidFn } from '@mink-ui/shared/interface'
import type { QueryMediaHandler, ScreenMatch } from '../_shared.props'

import { execute } from '@mink-ui/shared/function/execute'
import { isFunction } from '@mink-ui/shared/is/is-function'

import { INIT_MATCHES, MEDIA_QUERY } from '../_shared.constant'

class BreakpointObserver {
  /**
   * @description 订阅事件
   */
  private _listeners = new Set<QueryMediaHandler<void>>()

  /**
   * @description 当前断点响应值
   */
  private _matches: Record<string, boolean> = { ...INIT_MATCHES }

  /**
   * @description 取消事件
   */
  private _cancels: VoidFn[] = []

  /**
   * @description 当前断点信息
   */
  public get current() {
    return { ...this._matches } as ScreenMatch<boolean>
  }

  /**
   * @description 事件回调
   */
  private _dispatch = (e: MediaQueryListEvent) => {
    const matchItem = MEDIA_QUERY.get(e.media)

    if (matchItem && this._matches[matchItem] !== e.matches) {
      this._matches[matchItem] = e.matches

      this._listeners.forEach((fn) => { fn(this.current) })
    }
  }

  /**
   * @description 初始化
   */
  public initial = () => {
    if (this._cancels.length) return

    if (typeof window === 'undefined' || !isFunction(window.matchMedia)) return

    MEDIA_QUERY.forEach((point, query) => {
      const target = window.matchMedia(query)

      this._matches[point] = target.matches

      target.addEventListener('change', this._dispatch)

      this._cancels.push(() => {
        target.removeEventListener('change', this._dispatch)
      })
    })
  }

  /**
   * @description 订阅
   */
  public subscribe = (handler: QueryMediaHandler<void>) => {
    if (!this._cancels.length) this.initial()

    this._listeners.add(handler)

    handler(this.current)

    return () => {
      this._listeners.delete(handler)

      if (this._listeners.size) return

      this._cancels.forEach(execute)

      this._cancels = []
    }
  }
}

export default new BreakpointObserver()
