import type { CSSProperties, ReactNode, RefObject } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../_shared/types/has-children'
import type { ColProps } from '../../grid/src'
import type { ValidateStatus } from './_shared.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface FormItemInputForwardedProps {
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

export interface FormItemInputInjectedProps extends HasChildren {
  /**
   * @description
   */
  ref: RefObject<VoidFn | null>

  /**
   * @description 字段唯一 id
   */
  itemId: string | undefined

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
  className: string | undefined

  /**
   * @description 样式
   */
  style: CSSProperties | undefined

  /**
   * @description 外部命名空间
   */
  outerNamespace: string

  /**
   * @description 获取 Form.Item 元素
   */
  onGetFormItemElement: () => HTMLDivElement | null
}

export interface FormItemInputProps extends FormItemInputForwardedProps, FormItemInputInjectedProps {}

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

export const includedFormItemInputProps = exhaustive<DefaultNames | keyof FormItemInputForwardedProps>()([
  // props
  'extra',
  'help',
  'wrapperCol',
])
