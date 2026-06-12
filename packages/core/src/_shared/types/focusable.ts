export interface CommonFocusable {
  /**
   * @description 是否捕获焦点
   */
  focusTrap?: boolean

  /**
   * @description 失活重置焦点
   */
  returnFocus?: boolean
}

export interface HasFocusable {
  /**
   * @description 是否可聚焦
   */
  focusable?: boolean | CommonFocusable
}
