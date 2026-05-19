import type { CSSProperties, ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { UniqueKey } from '../../../types/unique-key'
import type { APPEAR, ENTER, ENTERED, ENTERING, ENTRY_MARK, EXIT, EXITED, EXITING } from './_shared.constant'

export type TransitionState = typeof ENTERED | typeof ENTERING | typeof EXITED | typeof EXITING

export type TransitionPhase = typeof APPEAR | typeof ENTER | typeof EXIT

export type TransitionMotions = Record<TransitionPhase, Partial<Record<'from' | 'active' | 'to' | 'done', string>>>

export type TransitionTimeouts = Record<TransitionPhase, number | undefined>

export type CssTransitionMotions = string | Partial<Record<
  | 'appearFrom' | 'appearActive' | 'appearTo' | 'appearDone'
  | 'enterFrom' | 'enterActive' | 'enterTo' | 'enterDone'
  | 'exitFrom' | 'exitActive' | 'exitTo' | 'exitDone',
  string
>>

export type CssTransitionTimeouts = number | Partial<Record<
 'appear' | 'enter' | 'exit',
 number
>>

export interface CssTransitionGetters {
  /**
   * @description 获取 className
   */
  names: () => string | undefined

  /**
   * @description 获取 style
   */
  attrs: () => CSSProperties | undefined
}

export interface ManagedTransitionEntry {
  /**
   * @private
   * @description 是否为管理状态
   */
  [ENTRY_MARK]: boolean

  /**
   * @description 唯一标识
   */
  key: UniqueKey | undefined

  /**
   * @description 过渡元素
   */
  node: ReactElement<any>

  /**
   * @description 供 SwitchTransition 使用的回调函数
   */
  callback?: VoidFn
}

export interface UniqueTransitionItem {
  /**
   * @description 唯一标识
   */
  key: UniqueKey | undefined

  /**
   * @description 额外属性
   */
  [extra: string]: unknown
}
