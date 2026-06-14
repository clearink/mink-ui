import type { SetStateDispatch } from '../../../_shared/types/state-dispatch'
import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { NotificationMethodParams } from '../_shared.props'
import type { NotificationItemSharedParams } from '../notification-item.props'

export class NotificationListControl {
  private _elements = new Map<UniqueKey, HTMLElement>()

  private _change!: SetStateDispatch<Map<UniqueKey, number>>

  public $root = { current: null as HTMLDivElement | null }

  public get root() {
    return this.$root.current
  }

  public _bind = (change: NotificationListControl['_change']) => {
    this._change = change
  }

  /**
   * @description 收集 DOM 元素
   */
  public collect = (el: HTMLElement | null, item: NotificationItemSharedParams) => {
    if (!el) this._elements.delete(item.key!)
    else this._elements.set(item.key!, el)
  }

  /**
   * @description 测量高度
   */
  public measure = (items: NotificationMethodParams[]) => {
    const next = new Map<UniqueKey, number>()

    const keys = new Set(items.map(item => item.key))

    this._elements.forEach((el, key) => {
      if (!keys.has(key)) return

      next.set(key, el.offsetHeight)
    })

    this._change(() => next)
  }
}
