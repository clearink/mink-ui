import type { SetStateDispatch } from '../../../_shared/types/state-dispatch'
import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { NotificationItemMethodConfig } from '../notification-item.props'

export class NotificationListControl {
  private _change!: SetStateDispatch<Map<UniqueKey, number>>

  public $container = { current: null as HTMLDivElement | null }

  public get container() {
    return this.$container.current
  }

  public _bind = (change: NotificationListControl['_change']) => {
    this._change = change
  }

  private append = (el: HTMLElement, key: UniqueKey) => {
    const { offsetHeight: height } = el

    this._change((prev) => {
      if (prev.get(key) === height) return prev

      const next = new Map(prev)

      next.set(key, height)

      return next
    })
  }

  private delete = (key: UniqueKey) => {
    this._change((prev) => {
      if (!prev.has(key)) return prev

      const next = new Map(prev)

      next.delete(key)

      return next
    })
  }

  public collect = (el: HTMLElement | null, item: NotificationItemMethodConfig) => {
    if (!el) this.delete(`${item.key}`)
    else this.append(el, `${item.key}`)
  }
}
