import type { MayBe, VoidFn } from '@mink-ui/shared/interface'
import type { TransitionMotions, TransitionPhase, TransitionState } from '../_shared.props'
import type { CssTransitionProps } from '../css-transition.props'

import { APPEAR, ENTER, ENTERED, ENTERING, EXIT, EXITED, EXITING, isEntered, isExit, isExited } from '../_shared.constant'
import { removeClassNames, updateClassNames } from './helpers'

export class CssTransitionControl<E extends HTMLElement> {
  /**
   * @description 内部保留过渡状态
   */
  private _state: TransitionState

  /**
   * @description 是否是首次渲染
   */
  private _isInitial = true

  /**
   * @description 是否被取消过
   */
  private _hasCanceled = false

  /**
   * @description 事件的清理函数
   */
  private _eventCleanup: null | VoidFn = null

  /**
   * @description frame 的清理函数
   */
  private _frameCleanup: null | VoidFn = null

  /**
   * @description DOM 元素
   */
  public element: E | null = null

  /**
   * @description 是否渲染过
   */
  public connected = false

  /**
   * @description 当前过渡状态
   */
  public state: TransitionState

  /**
   * @description 元素 classname
   */
  public names: MayBe<string>[] = []

  constructor(props: CssTransitionProps<E>, motions: TransitionMotions) {
    const { appear, when } = props

    this.state = !when || appear ? EXITED : ENTERED

    this.names = when && appear
      ? [motions[APPEAR].from]
      : [motions[isExited(this.state) ? EXIT : ENTER].done]

    this._state = this.state
  }

  /**
   * @description DOM 元素 refCallback
   */
  public $element = (el: E | null) => {
    this.element = el

    if (el) this.connected = true
  }

  /**
   * @description 计算状态
   */
  public compute = (when: boolean) => {
    const { _isInitial, state } = this

    if (_isInitial) this._isInitial = false

    if (_isInitial && when && isExited(state)) return APPEAR

    if (!_isInitial && when && isExited(state)) return ENTER

    if (!_isInitial && !when && isEntered(state)) return EXIT
  }

  /**
   * @description 开始
   */
  public begin = (el: E, phase: TransitionPhase, motions: TransitionMotions, skipBeginning: boolean) => {
    this.state = isExit(phase) ? EXITING : ENTERING

    removeClassNames(el, this.names)

    const skip = this._hasCanceled && skipBeginning

    this.names = [motions[phase].from, skip ? motions[phase].active : null]

    updateClassNames(el, this.names)

    return skip
  }

  /**
   * @description 激活
   */
  public active = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    removeClassNames(el, this.names)

    this.names = [motions[phase].from, motions[phase].active]

    updateClassNames(el, this.names)
  }

  /**
   * @description 下一帧
   */
  public frame = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    removeClassNames(el, this.names)

    this.names = [motions[phase].active, motions[phase].to]

    updateClassNames(el, this.names)
  }

  /**
   * @description 结束
   */
  public finish = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    this._hasCanceled = false

    this.state = isExit(phase) ? EXITED : ENTERED

    removeClassNames(el, this.names)

    this.names = [motions[phase].done]

    updateClassNames(el, this.names)
  }

  /**
   * @description 取消
   */
  public cancel = (phase: TransitionPhase) => {
    this._hasCanceled = true

    this.state = isExit(phase) ? EXITED : ENTERED
  }

  /**
   * @description 设置 event 清理函数
   */
  public setEventCleanup = (fn: VoidFn) => {
    this._eventCleanup = fn
  }

  /**
   * @description 执行 event 清理函数
   */
  public runEventCleanup = () => {
    this._eventCleanup?.()

    this._eventCleanup = null
  }

  /**
   * @description 设置 frame 清理函数
   */
  public setFrameCleanup = (fn: VoidFn) => {
    this._frameCleanup = fn
  }

  /**
   * @description 执行 frame 清理函数
   */
  public runFrameCleanup = () => {
    this._frameCleanup?.()

    this._frameCleanup = null
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.runEventCleanup()

    this.runFrameCleanup()

    this._isInitial = true

    this.state = this._state
  }
}
