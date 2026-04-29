import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionInstance } from '../../../_shared/components/transition/src/css-transition.props'
import type { SegmentedValue } from '../_shared.props'

import { nextTick } from '@mink-ui/shared/dom/raf'
import { getClientCoords } from '@mink-ui/shared/dom/rect'

export class SegmentedRefs {
  private _cleanup = null as VoidFn | null

  public $inner = { current: null as HTMLDivElement | null }

  public $thumb = { current: null as HTMLDivElement | null }

  public $items = new Map<SegmentedValue | null, HTMLElement>()

  public $instance = { current: null as CssTransitionInstance<HTMLDivElement> | null }

  public get inner() {
    return this.$inner.current!
  }

  public get thumb() {
    return this.$thumb.current!
  }

  public get items() {
    return this.$items
  }

  public get instance() {
    return this.$instance.current!
  }

  /**
   * @description 更新 thumb 位置
   */
  public update = (currentValue: SegmentedValue) => {
    this.dispose()

    this._cleanup = nextTick(() => {
      const target = this.items.get(currentValue)

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
   * @description 清理
   */
  public dispose = () => {
    this._cleanup?.()

    this._cleanup = null
  }
}
