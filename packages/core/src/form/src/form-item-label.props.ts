import type { CSSProperties, ReactNode } from 'react'
import type { ColProps } from '../../grid/src'
import type { LabelAlign, RequiredMark } from './_shared.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface FormItemLabelForwardedProps {
  /**
   * @description 字段名称
   */
  label?: ReactNode

  /**
   * @description label 对齐方式
   */
  labelAlign?: LabelAlign

  /**
   * @description label 是否换行
   */
  labelWrap?: boolean

  /**
   * @description labelCol (布局相关)
   */
  labelCol?: ColProps

  /**
   * @description label 后面的冒号 (layout 为 horizontal 时生效)
   */
  colon?: boolean

  /**
   * @description label 的 for 属性
   */
  htmlFor?: string

  /**
   * @description 浮层展示 TODO: 待完善
   */
  tooltip?: any

  /**
   * @description 必选项特殊标记
   */
  requiredMark?: RequiredMark
}

export interface FormItemLabelInjectedProps {
  /**
   * @description htmlFor 的默认值
   */
  itemId: string | undefined

  /**
   * @description 是否必填
   */
  required: boolean

  /**
   * @description 类名
   */
  className: string | undefined

  /**
   * @description 样式
   */
  style: CSSProperties | undefined

  /**
   * @description 外部命名空间
   */
  outerNamespace: string
}

export interface FormItemLabelProps extends FormItemLabelForwardedProps, FormItemLabelInjectedProps {}

export type DefaultNames = 'htmlFor' | 'colon' | 'labelAlign' | 'labelWrap' | 'labelCol' | 'requiredMark'

export type PickedFormItemLabelProps = Pick<FormItemLabelProps, DefaultNames>

export type OmittedFormItemLabelProps = Omit<FormItemLabelProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const includedFormItemLabelProps = exhaustive<DefaultNames | keyof FormItemLabelForwardedProps>()([
  // props
  'label',
  'labelAlign',
  'labelWrap',
  'labelCol',
  'colon',
  'htmlFor',
  'tooltip',
  'requiredMark',
])
