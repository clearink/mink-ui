import type { ReactNode, Ref, RefCallback } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionGetters, UniqueTransitionItem } from './_shared.props'
import type { CssTransitionProps } from './css-transition.props'
import type { GroupTransitionControl } from './utils/group-transition-control'

export interface GroupTransitionInstance {
  instances: GroupTransitionControl['instances']
}

export interface GroupTransitionProps<T extends UniqueTransitionItem = UniqueTransitionItem> extends
  Omit<CssTransitionProps, 'ref' | 'children' | 'unmountOnExit' | 'when'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<GroupTransitionInstance>

  /**
   * @description 过渡元素项
   */
  items: T[]

  /**
   * @description 子元素
   */
  children: ($ref: RefCallback<HTMLElement>, getters: CssTransitionGetters, item: T) => ReactNode

  /**
   * @description 过渡结束时的回调
   */
  onGroupExited?: VoidFn
}
