import type { CSSProperties, ReactElement } from 'react'
import type { APPEAR, ENTER, ENTERED, ENTERING, EXIT, EXITED, EXITING } from './_shared.constant'

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
  names: () => string | undefined
  attrs: () => CSSProperties | undefined
}

/** -----------------------------| switch transition -----------------------------| */

export interface SwitchTransitionEntry {
  /**
   * @description 唯一 id
   */
  key: ReactElement['key']

  /**
   * @description 原始元素
   */
  raw: ReactElement<any>

  /**
   * @description 过渡元素
   */
  node: ReactElement<any>
}

export type GroupTransitionEntry = SwitchTransitionEntry
