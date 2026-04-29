import type { CSSProperties, ReactNode } from 'react'
import type { ColProps } from '../../grid/src'
import type { LabelAlign, RequiredMark } from './_shared.props'

/**
 * @description 属于 Form.Item 的 props，但是要传递给 FormItemLabel 组件
 */
export interface FormItemLabelOwnProps {
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

export interface FormItemLabelProps extends FormItemLabelOwnProps {
  /**
   * @description htmlFor 的默认值
   */
  itemId?: string

  /**
   * @description 是否必填
   */
  required: boolean

  /**
   * @description 类名
   */
  className?: string

  /**
   * @description 样式
   */
  style?: CSSProperties

  /**
   * @description 前缀
   */
  rootNamespace: string
}

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

// keyof FormItemLabelOwnProps
export const includedFormItemLabelProps = [
  'label',
  'labelAlign',
  'labelWrap',
  'labelCol',
  'colon',
  'htmlFor',
  'tooltip',
  'requiredMark',
] as const
