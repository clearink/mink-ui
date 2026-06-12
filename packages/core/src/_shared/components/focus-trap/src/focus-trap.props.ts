import type { ReactElement, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../../types/has-children'

export interface FocusTrapInstance {
  focus: VoidFn
}

export interface FocusTrapInjectedProps extends HasChildren<ReactElement> {
  /**
   * @description 外部引用
   */
  ref?: Ref<FocusTrapInstance>

  /**
   * @description 是否激活
   */
  active?: boolean

  /**
   * @description 失活时是否返回焦点
   */
  returnFocus?: boolean
}

export interface FocusTrapProps extends FocusTrapInjectedProps {}
