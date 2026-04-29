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
   * @description 监听事件清理函数
   */
  private _cleanup: null | VoidFn = null

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
   * @description 更新清理函数
   */
  updateCleanup = (cleanup: VoidFn) => {
    this._cleanup = cleanup
  }

  /**
   * @description 连接到 DOM 元素
   */
  connect = (el: E | null) => {
    this.$element = el

    if (el) this.connected = true

    return () => { this.$element = null }
  }

  /**
   * @description 计算状态
   */
  calculate = (when: boolean | undefined) => {
    const { _isInitial, state } = this

    if (_isInitial) this._isInitial = false

    if (_isInitial && when && isExited(state)) return APPEAR

    if (!_isInitial && when && isExited(state)) return ENTER

    if (!_isInitial && !when && isEntered(state)) return EXIT
  }

  /**
   * @description 开始
   */
  begin = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    this.state = isExit(phase) ? EXITING : ENTERING

    removeClassNames(el, this.names)

    this.names = [motions[phase].from]

    updateClassNames(el, this.names)
  }

  /**
   * @description 激活
   */
  active = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    removeClassNames(el, this.names)

    this.names = [motions[phase].from, motions[phase].active]

    updateClassNames(el, this.names)
  }

  /**
   * @description 下一帧
   */
  frame = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    removeClassNames(el, this.names)

    this.names = [motions[phase].active, motions[phase].to]

    updateClassNames(el, this.names)
  }

  /**
   * @description 结束
   */
  finish = (el: E, phase: TransitionPhase, motions: TransitionMotions) => {
    this.state = isExit(phase) ? EXITED : ENTERED

    removeClassNames(el, this.names)

    this.names = [motions[phase].done]

    updateClassNames(el, this.names)
  }

  /**
   * @description 取消
   */
  cancel = (phase: TransitionPhase) => {
    this.state = isExit(phase) ? EXITED : ENTERED
  }

  /**
   * @description 清理
   */
  dispose = () => {
    this._cleanup?.()

    this._cleanup = null
  }

  /**
   * @description 销毁
   */
  destroy = () => {
    this.dispose()

    this._isInitial = true

    this.state = this._state
  }
}
