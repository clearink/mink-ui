import type { ExternalFormFieldProps } from '@mink-ui/core/_shared/components'
import type { CSSProperties, ReactNode } from 'react'

import type { ValidateStatus } from '../_shared.props'
import type { FormInstance } from '../form/props'
import type { FormItemInputProps } from '../form-item-input/props'
import type { FormItemLabelProps } from '../form-item-label/props'

export interface FormItemProps<State = any>
  extends Omit<FormItemLabelProps, 'required'>,
  Pick<FormItemInputProps, 'extra' | 'help' | 'wrapperCol'>,
  Omit<ExternalFormFieldProps<State>, 'children' | 'onMetaChange'> {
  children?: ((form: FormInstance<State>) => ReactNode) | ReactNode

  className?: string

  /**
   * @zh-CN 隐藏控件
   */
  hidden?: boolean

  /**
   * @zh-CN `label` 标签的文本
   */
  label?: ReactNode

  /**
   * @zh-CN 为 `true` 时不带样式，作为纯字段控件使用
   */
  noStyle?: boolean

  /**
   * @zh-CN 必填样式设置。如不设置，则会根据校验规则自动生成
   * @default false
   */
  required?: boolean

  style?: CSSProperties

  /**
   * @zh-CN 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
   */
  validateStatus?: ValidateStatus
}
