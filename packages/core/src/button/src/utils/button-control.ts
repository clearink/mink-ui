import type { CSSProperties } from 'react'

export class ButtonControl {
  private _width = 0

  public measure = (el: HTMLElement): CSSProperties => {
    if (!this._width) this._width = el.scrollWidth

    return { width: this._width }
  }

  public reset = () => {
    this._width = 0
  }
}
