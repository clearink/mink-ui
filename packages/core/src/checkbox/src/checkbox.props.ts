import type { InputHTMLAttributes } from 'react'
import type { HasChildren } from '../../_shared/types/has-children'
import type { SemanticsStyled } from '../../_shared/types/styled'

export interface CheckboxInjectedProps extends
  HasChildren,
  SemanticsStyled<'root' | 'input' | 'inner' | 'label', CheckboxProps> {
  /**
   * @description 是否选中
   */
  checked?: boolean

  /**
   * @description 初始是否选中
   */
  defaultChecked?: boolean

  /**
   * @description 是否禁用
   */
  disabled?: boolean

  /**
   * @description 设置 indeterminate 状态，只负责样式控制
   */
  indeterminate?: boolean

  /**
   * @description 变化时的回调函数
   */
  onChange?: (checked: boolean) => void
}

export interface CheckboxProps extends
  CheckboxInjectedProps,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {}

export type DefaultNames = 'disabled'

export type PickedCheckboxProps = Pick<CheckboxProps, DefaultNames>

export type OmittedCheckboxProps = Omit<CheckboxProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultCheckboxProps: PickedCheckboxProps = {
}
