import type { RefObject } from 'react'

import { pushItem } from '@mink-ui/shared/array/push-item'
import { removeItem } from '@mink-ui/shared/array/remove-item'
import { getShadowRoot } from '@mink-ui/shared/dom/shadow'
import { noop } from '@mink-ui/shared/function/noop'

/**
 * @description 不涉及状态变更, 可以理解为多个 useRef
 */
export class TooltipControl {
  /**
   * @description 浮层元素
   */
  public $popup: RefObject<HTMLDivElement | null> = { current: null }

  /**
   * @description 触发元素
   */
  public $trigger: RefObject<HTMLElement | null> = { current: null }

  /**
   * @description popup chain
   */
  public chain: Element[] = []

  get popup() {
    return this.$popup.current
  }

  get trigger() {
    return this.$trigger.current
  }

  /**
   * @description 添加实例
   */
  public enqueue = (el: Element | null) => {
    if (!el) return noop

    pushItem(this.chain, el)

    return () => { removeItem(this.chain, el) }
  }

  /**
   * @description 是否处于 popup chain 中
   */
  public inChain = (event: MouseEvent) => {
    const { trigger, popup, chain } = this

    const el = event.target as Element

    const isInChain = (item: Element | null) => {
      if (!item) return false

      if (item === el || item.contains(el)) return true

      return getShadowRoot(item)?.host === el
    }

    return isInChain(trigger) || isInChain(popup) || chain.some(isInChain)
  }
}
