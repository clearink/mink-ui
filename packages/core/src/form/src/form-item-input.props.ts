import type { CSSProperties, ReactNode, RefObject } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { ColProps } from '../../grid/src'
import type { ValidateStatus } from './_shared.props'

export interface FormItemInputOwnProps {
  /**
   * @description 额外信息
   */
  extra?: ReactNode

  /**
   * @description 辅助信息
   */
  help?: ReactNode

  /**
   * @description wrapperCol (布局相关)
   */
  wrapperCol?: ColProps
}

export interface FormItemInputProps extends FormItemInputOwnProps {
  /**
   * @description
   */
  ref: RefObject<VoidFn | null>

  /**
   * @description 子元素
   */
  children: ReactNode

  /**
   * @description 字段唯一 id
   */
  itemId?: string

  /**
   * @description 校验状态
   */
  status: ValidateStatus

  /**
   * @description 告警信息
   */
  warnings: ReactNode[]

  /**
   * @description 错误信息
   */
  errors: ReactNode[]

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

  /**
   * @description 获取 Form.Item 元素
   */
  onGetFormItemElement: () => HTMLDivElement | null
}

export type DefaultNames = 'wrapperCol'

export type PickedFormItemInputProps = Pick<FormItemInputProps, DefaultNames>

export type OmittedFormItemInputProps = Omit<FormItemInputProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

// keyof FormItemInputOwnProps
export const includedFormItemInputProps = [
  'extra',
  'help',
  'wrapperCol',
] as const
