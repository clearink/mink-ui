import type { ReactNode, RefCallback } from 'react'
import type { CssTransitionGetters, UniqueTransitionItem } from './_shared.props'
import type { CssTransitionProps } from './css-transition.props'

export interface SwitchTransitionProps<T extends UniqueTransitionItem = UniqueTransitionItem> extends
  Omit<CssTransitionProps, 'ref' | 'children' | 'unmountOnExit' | 'when'> {
  /**
   * @description 过渡元素项
   */
  current: T

  /**
   * @description 子元素
   */
  children: ($ref: RefCallback<HTMLElement>, getters: CssTransitionGetters, item: T) => ReactNode

  /**
   * @description 过渡切换模式
   */
  mode?: 'default' | 'in-out' | 'out-in'
}
