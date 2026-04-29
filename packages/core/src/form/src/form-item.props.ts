import type { ReactNode } from 'react'
import type { InternalFormFieldProps } from '../../_shared/components/form/src'
import type { SemanticsStyled } from '../../_shared/types'
import type { FormInstance, ValidateStatus } from './_shared.props'
import type { FormItemInputOwnProps } from './form-item-input.props'
import type { FormItemLabelOwnProps } from './form-item-label.props'

export type FunctionalChildren = (form: FormInstance) => ReactNode

export interface FormItemProps<V = any> extends
  FormItemInputOwnProps,
  FormItemLabelOwnProps,
  Omit<InternalFormFieldProps<V>, 'children' | 'onMetaChange'>,
  SemanticsStyled<'root' | 'label' | 'input'> {
  /**
   * @description 子元素
   */
  children?: ReactNode | FunctionalChildren

  /**
   * @description 纯净模式 (无任何样式)
   */
  pure?: boolean

  /**
   * @description 是否隐藏字段 (display: none; 依然会收集和校验字段)
   */
  hidden?: boolean

  /**
   * @description 是否必填
   */
  required?: boolean

  /**
   * @description 校验状态
   */
  validateStatus?: ValidateStatus

  /**
   * @description 校验状态反馈(TODO)
   */
  hasFeedback?: boolean | { icons: any }
}

export type DefaultNames = 'children'

export interface PickedFormItemProps<V = any> extends Pick<FormItemProps<V>, DefaultNames> {
  children: ReactNode | ReactNode[] | FunctionalChildren
}

export type OmittedFormItemProps<V = any> = Omit<FormItemProps<V>, DefaultNames>
