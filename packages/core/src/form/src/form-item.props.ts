import type { ReactNode } from 'react'
import type { InternalFormFieldProps } from '../../_shared/components/form/src'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { FormItemRenderFunction, ValidateStatus } from './_shared.props'
import type { FormItemInputForwardedProps } from './form-item-input.props'
import type { FormItemLabelForwardedProps } from './form-item-label.props'

export interface FormItemProps<V = any> extends
  FormItemInputForwardedProps,
  FormItemLabelForwardedProps,
  HasSemanticsStyled<'root' | 'label' | 'input', FormItemProps<V>>,
  Omit<InternalFormFieldProps<V>, 'children' | 'onMetaChange'> {
  /**
   * @description 子元素
   */
  children?: ReactNode | FormItemRenderFunction

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
  children: ReactNode | ReactNode[] | FormItemRenderFunction
}

export type OmittedFormItemProps<V = any> = Omit<FormItemProps<V>, DefaultNames>
