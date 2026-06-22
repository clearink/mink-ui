import type { AnyObj } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../../types/has-children'

export interface ShouldUpdateProps extends AnyObj, HasChildren {
  /**
   * @description 比较函数 返回 true 需要更新
   */
  when: (prev: AnyObj, next: AnyObj) => boolean
}
