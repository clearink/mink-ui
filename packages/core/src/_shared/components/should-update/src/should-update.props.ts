import type { ReactNode } from 'react'
import type { AnyObj } from '@mink-ui/shared/interface'

export interface ShouldUpdateProps extends AnyObj {
  /**
   * @description 子元素 (必须为合法的 react-element)
   */
  children: ReactNode
  /**
   * @description 比较函数 返回 true 需要更新
   */
  when: (prev: AnyObj, next: AnyObj) => boolean
}
