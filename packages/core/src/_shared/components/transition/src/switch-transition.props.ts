import type { ReactElement } from 'react'
import type { CssTransitionProps } from './css-transition.props'

export interface SwitchTransitionProps extends
  Omit<CssTransitionProps, 'children' | 'unmountOnExit' | 'when'> {
  /**
   * @description 子元素
   */
  children: ReactElement<HTMLElement>

  /**
   * @description 过渡切换模式
   */
  mode?: 'default' | 'in-out' | 'out-in'
}
