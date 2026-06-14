import type { SetStateDispatch } from '../../../_shared/types/state-dispatch'
import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { MasonryItemType } from '../_shared.props'

export class MasonryControl {
  private _change!: SetStateDispatch<Map<UniqueKey, number>>

  private _elements = new Map<UniqueKey, HTMLElement>()

  public $root = { current: null as HTMLDivElement | null }

  public get root() {
    return this.$root.current
  }

  public _bind = (change: MasonryControl['_change']) => {
    this._change = change
  }

  /**
   * @description 收集 DOM 信息
   */
  public collect = (el: HTMLElement | null, item: MasonryItemType<any>) => {
    if (!el) this._elements.delete(item.key)
    else this._elements.set(item.key, el)
  }

  /**
   * @description 主动触发更新
   */
  public trigger = () => {
    this._change((prev) => {
      const next = new Map<UniqueKey, number>()

      let changed = this._elements.size !== prev.size

      this._elements.forEach((el, key) => {
        const { height } = el.getBoundingClientRect()

        next.set(key, height)

        if (prev.get(key) !== height) changed = true
      })

      return changed ? next : prev
    })
  }

  /**
   * @description 测量 DOM 信息
   */
  public measure = (items: MasonryItemType[]) => {
    this._change((prev) => {
      const next = new Map<UniqueKey, number>()

      const keys = new Set(items.map(item => item.key))

      let changed = keys.size !== prev.size

      this._elements.forEach((el, key) => {
        if (!keys.has(key)) return

        const { height } = el.getBoundingClientRect()

        next.set(key, height)

        if (prev.get(key) !== height) changed = true
      })

      return changed ? next : prev
    })
  }
}
