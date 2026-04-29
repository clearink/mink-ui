import type { CSSProperties, ReactNode, Ref, RefCallback } from 'react'
import type { CssTransitionGetters, CssTransitionMotions, CssTransitionTimeouts } from './_shared.props'

export interface CssTransitionInstance<E extends HTMLElement = HTMLElement> {
  /**
   * @description DOM 元素
   */
  element: E | null

  isEntering: boolean

  isEntered: boolean

  isExiting: boolean

  isExited: boolean

  setCssValues: (values: Record<string, string | number>) => void
}

export interface CssTransitionProps<E extends HTMLElement = HTMLElement> {
  /**
   * @description 外部引用
   */
  ref?: Ref<CssTransitionInstance<E>>

  /**
   * @description 子元素
   */
  children: ($ref: RefCallback<E>, getters: CssTransitionGetters) => ReactNode

  /**
   * @description 是否进行过渡
   */
  when?: boolean

  /**
   * @description 是否进行初次渲染过渡
   */
  appear?: boolean

  /**
   * @description 过渡类名
   */
  classNames?: CssTransitionMotions

  /**
   * @description 过渡时间
   */
  timeouts?: CssTransitionTimeouts

  /**
   * @description 过渡类型
   */
  type?: 'transition' | 'animation'

  /**
   * @description 延迟元素挂载
   */
  mountOnEnter?: boolean

  /**
   * @description 元素退出后卸载
   */
  unmountOnExit?: boolean

  /**
   * @description enter 过渡开始时调用
   */
  onEnter?: (el: E, appearing: boolean) => void | CSSProperties

  /**
   * @description enter 过渡激活时调用
   */
  onEntering?: (el: E, appearing: boolean) => void | CSSProperties

  /**
   * @description enter 过渡结束时调用
   */
  onEntered?: (el: E, appearing: boolean) => void | CSSProperties

  /**
   * @description enter 过渡取消时调用
   */
  onEnterCancel?: (el: E, appearing: boolean) => void

  /**
   * @description exit 过渡开始时调用
   */
  onExit?: (el: E) => void | CSSProperties

  /**
   * @description exit 过渡激活时调用
   */
  onExiting?: (el: E) => void | CSSProperties

  /**
   * @description exit 过渡结束时调用
   */
  onExited?: (el: E) => void | CSSProperties

  /**
   * @description exit 过渡取消时调用
   */
  onExitCancel?: (el: E) => void
}
