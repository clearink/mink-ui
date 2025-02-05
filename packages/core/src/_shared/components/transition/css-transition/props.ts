import type { ReactElement, RefCallback } from 'react'

import type { APPEAR, ENTER, ENTERED, ENTERING, EXIT, EXITED, EXITING } from '../_shared.constant'

export type TransitionStep = typeof APPEAR | typeof ENTER | typeof EXIT

export type TransitionStatus = typeof ENTERED | typeof ENTERING | typeof EXITED | typeof EXITING

export interface CssTransitionRef<E extends HTMLElement = HTMLElement> {
  element: E | null
  status: TransitionStatus
  isEntering: boolean
  isEntered: boolean
  isExiting: boolean
  isExited: boolean
}

export type CssTransitionClassNames = Record<TransitionStep, { active?: string, done?: string, from?: string, to?: string }>

export type CssTransitionTimeouts = Record<TransitionStep, number | undefined>

export interface CssTransitionProps<E extends HTMLElement = HTMLElement> {
  /**
   * @description 组件挂载时是否立即进行过渡
   * @default false
   */
  appear?: boolean
  /**
   * @description 触发过渡阶段
   */
  when?: boolean
  /**
   * @zh-CN 退出过渡结束时卸载元素
   * @default false
   */
  unmountOnExit?: boolean
  /**
   * @zh-CN 进入过渡时才进行初次渲染
   * @default false
   */
  mountOnEnter?: boolean
  /**
   * @description 过渡元素
   */
  children: ((refCallback: RefCallback<E>, transitionClass?: string) => ReactElement) | ReactElement
  /**
   * @description 本次过渡的类型
   */
  type?: 'animation' | 'transition'
  /**
   * @description 过渡类名, 也可以依次设置各个阶段的类名
   */
  classNames?: {
    appearActive?: string
    appearDone?: string
    appearFrom?: string
    appearTo?: string
    enterActive?: string
    enterDone?: string
    enterFrom?: string
    enterTo?: string
    exitActive?: string
    exitDone?: string
    exitFrom?: string
    exitTo?: string
  } | string
  /**
   * @zh-CN 设置每个过渡阶段的持续时间
   */
  timeouts?: { appear?: number, enter?: number, exit?: number } | number

  // events
  onEnter?: (el: E, appearing: boolean,) => void
  onEntering?: (el: E, appearing: boolean,) => void
  onEntered?: (el: E, appearing: boolean,) => void
  onEnterCancel?: (el: E, appearing: boolean,) => void
  onExit?: (el: E,) => void
  onExiting?: (el: E,) => void
  onExited?: (el: E,) => void
  onExitCancel?: (el: E,) => void
}
