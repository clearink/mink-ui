import type { ReactElement, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionProps } from './css-transition.props'
import type { GroupTransitionControl } from './utils/group-transition-control'

export interface GroupTransitionInstance {
  instances: GroupTransitionControl['instances']
}

export interface GroupTransitionProps extends
  Omit<CssTransitionProps, 'ref' | 'children' | 'unmountOnExit' | 'when'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<GroupTransitionInstance>

  /**
   * @description 子元素
   */
  children: ReactElement<HTMLElement>[]

  /**
   * @description 过渡结束时的回调
   */
  onFinished?: VoidFn
}
