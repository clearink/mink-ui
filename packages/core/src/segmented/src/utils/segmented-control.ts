import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionInstance } from '../../../_shared/components/transition/src/css-transition.props'
import type { SegmentedOptionType, SegmentedValue } from '../_shared.props'

import { nextTick } from '@mink-ui/shared/dom/raf'
import { getClientCoords } from '@mink-ui/shared/dom/rect'

export class SegmentedControl {
  private _cleanup = null as VoidFn | null

  public $inner = { current: null as HTMLDivElement | null }

  public $thumb = { current: null as HTMLDivElement | null }

  public $instance = { current: null as CssTransitionInstance<HTMLDivElement> | null }

  public items = new Map<SegmentedValue | null, HTMLElement>()

  public get inner() {
    return this.$inner.current!
  }

  public get thumb() {
    return this.$thumb.current!
  }

  public get instance() {
    return this.$instance.current!
  }

  public collect = (el: HTMLElement | null, item: SegmentedOptionType) => {
    if (el) this.items.set(item.value, el)
    else this.items.delete(item.value)
  }

  /**
   * @description 清理
   */
  private clear = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 更新 thumb 位置
   */
  public update = (value: SegmentedValue) => {
    this.clear()

    this._cleanup = nextTick(() => {
      const target = this.items.get(value)

      if (!target || !this.instance || !this.inner) return

      const innerCoords = getClientCoords(this.inner)
      const targetCoords = getClientCoords(target)

      const delta = targetCoords.left - innerCoords.left

      this.instance.setCssValues({
        transform: `translateX(${delta}px)`,
        width: `${targetCoords.width}px`,
      })
    })
  }

  /**
   * @description 计算 thumb 位置
   */
  public resolve = (item: HTMLElement) => {
    const itemCoords = getClientCoords(item)
    const innerCoords = getClientCoords(this.inner)

    const delta = itemCoords.left - innerCoords.left

    return {
      transform: `translate3d(${delta}px, 0, 0)`,
      width: `${itemCoords.width}px`,
    }
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.clear()

    this.items.clear()
  }
}
