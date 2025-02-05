import type { VoidFn } from '@mink-ui/shared'
import type { ReactElement } from 'react'

import type { CssTransitionProps as CssProps } from '../css-transition/props'
import type { TransitionState } from './hooks/use-transition-store'

export interface GroupTransitionProps<E extends HTMLElement> extends Omit<CssProps<E>, 'children' | 'unmountOnExit' | 'when'> {
  children: ReactElement[]

  /**
   * @zh-CN 全部删除完毕
   */
  onFinished?: VoidFn
}

export interface GroupTransitionRef<E extends HTMLElement = HTMLElement> {
  components: TransitionState<E>['components']
}

export interface GroupElementItem {
  freeze: boolean
  node: ReactElement
  key: ReactElement['key']
}
