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
  private _eventsCleanup: null | VoidFn = null

  /**
   * @description frame 的清理函数
   */
  private _framesCleanup: null | VoidFn = null

  /**
   * @description DOM 元素引用
   */
  public $element: E | null = null

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
   * @description 同步 events 清理函数
   */
  public syncEvents = (cleanup: VoidFn) => {
    this._eventsCleanup = cleanup
  }

  /**
   * @description 同步 frames 清理函数
   */
  public syncFrames = (cleanup: VoidFn) => {
    this._framesCleanup = cleanup
  }

  /**
   * @description 连接到 DOM 元素
   */
  public connect = (el: E | null) => {
    this.$element = el

    if (el) this.connected = true

    return () => { this.$element = null }
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
  public begin = (el: E, phase: TransitionPhase, motions: TransitionMotions, resumeOnCancel: boolean) => {
    this.state = isExit(phase) ? EXITING : ENTERING

    removeClassNames(el, this.names)

    const resume = this._hasCanceled && resumeOnCancel

    this.names = [motions[phase].from, resume ? motions[phase].active : null]

    updateClassNames(el, this.names)

    return resume
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
   * @description 清理 events 的回调
   */
  public clearEvents = () => {
    this._eventsCleanup?.()

    this._eventsCleanup = null
  }

  /**
   * @description 清理 frames 的回调
   */
  public clearFrames = (): any => {
    this._framesCleanup?.()

    this._framesCleanup = null
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.clearEvents()

    this.clearFrames()

    this._isInitial = true

    this.state = this._state
  }
}
