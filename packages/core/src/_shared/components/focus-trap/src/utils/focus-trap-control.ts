import type { FocusTrapProps } from '../focus-trap.props'

import { ownerDocument } from '@mink-ui/shared/dom/global'

import { isPressKey } from '../../../../utils/keyboard'
import { getSiblingElements } from './element'
import { focusElement } from './helpers'
import { focusTrapStack } from './singleton'

export class FocusTrapControl {
  private _props = {} as FocusTrapProps

  private _isShiftTab = false

  private _latestFocus: HTMLElement | null = null

  private _savedElement: Element | null = null

  public $start = { current: null as HTMLDivElement | null }

  public $end = { current: null as HTMLDivElement | null }

  public get start() {
    return this.$start.current
  }

  public get end() {
    return this.$end.current
  }

  /**
   * @description 绑定最新的数据
   */
  public _bind = (props: FocusTrapProps) => {
    this._props = props
  }

  private restoreFocus = () => {
    const { returnFocus } = this._props

    returnFocus && focusElement(this._savedElement as HTMLElement)
  }

  private handleFocus = (root: Document, target: HTMLElement | null) => {
    if (!target || !this.start || !this.end) return

    const elements = getSiblingElements(this.start, this.end)

    if (!elements.length) return

    const active = root.activeElement

    if (active !== this.start && active !== this.end) {
      if (elements.some(el => el === target || el.contains(target))) {
        this._latestFocus = target
        return
      }

      if (this._latestFocus) return focusElement(this._latestFocus)
    }

    focusElement(this._isShiftTab ? this.end : this.start)
  }

  public subscribe = () => focusTrapStack.subscribe(ownerDocument())

  public activate = (active: boolean) => {
    if (!active) return

    const root = ownerDocument(this.start)

    this._savedElement = root.activeElement

    const unregister = focusTrapStack.register({
      onKeyDown: (e) => {
        this._isShiftTab = e.shiftKey && isPressKey(e.key, 'tab')

        this.handleFocus(root, e.target as HTMLElement)
      },
      onFocusIn: (e) => {
        e.stopImmediatePropagation()

        this.handleFocus(root, e.target as HTMLElement)
      },
    })

    return () => {
      unregister()

      this.restoreFocus()

      this._latestFocus = null
      this._savedElement = null
    }
  }
}
