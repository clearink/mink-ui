import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionInstance } from '../../../_shared/components/transition/src/css-transition.props'
import type { SegmentedOptionType, SegmentedValue } from '../_shared.props'

import { nextTick } from '@mink-ui/shared/dom/raf'

export class SegmentedControl {
  private _cleanup = null as VoidFn | null

  public $instance = { current: null as CssTransitionInstance<HTMLDivElement> | null }

  public items = new Map<SegmentedValue | null, HTMLElement>()

  public get instance() {
    return this.$instance.current!
  }

  /**
   * @description 清理
   */
  private dispose = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  public collect = (el: HTMLElement | null, item: SegmentedOptionType) => {
    if (el) this.items.set(item.value, el)
    else this.items.delete(item.value)
  }

  /**
   * @description 计算 thumb 位置
   */
  public resolve = (key: SegmentedValue | null) => {
    const item = this.items.get(key)

    if (!item) return

    return {
      transform: `translate3d(${item.offsetLeft}px, 0, 0)`,
      width: `${item.clientWidth}px`,
    }
  }

  /**
   * @description 更新 thumb 位置
   */
  public update = (key: SegmentedValue) => {
    this.dispose()

    this._cleanup = nextTick(() => {
      const cssValues = this.instance ? this.resolve(key) : null

      cssValues && this.instance.setCssValues(cssValues)
    })
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.dispose()

    this.items.clear()
  }
}
