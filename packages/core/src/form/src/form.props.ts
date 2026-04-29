import type { Ref } from 'react'
import type { InternalFormProps } from '../../_shared/components/form/src'
import type { CommonDisabled, CommonSize, SemanticsStyled } from '../../_shared/types'
import type { FormInstance, FormLayout, FormVariant } from './_shared.props'
import type { FormItemProps } from './form-item.props'

export interface FormProps<S = any> extends
  Omit<InternalFormProps<S>, 'form'>,
  Pick<FormItemProps, 'colon' | 'labelAlign' | 'labelWrap' | 'labelCol' | 'wrapperCol' | 'requiredMark'>,
  SemanticsStyled<'root' | 'label' | 'input'> {
  /**
   * @description 外部引用
   */
  ref?: { nativeElement: HTMLFormElement } & Ref<FormInstance<S>>

  /**
   * @description form 实例 (useForm 返回值，不传会自动创建)
   */
  form?: FormInstance<S>

  /**
   * @description 是否禁用表单
   */
  disabled?: CommonDisabled

  /**
   * @description 表单布局
   */
  layout?: FormLayout

  /**
   * @description 表单尺寸
   */
  size?: CommonSize

  /**
   * @description 校验失败滚动到第一个错误项
   */
  scrollToFirstError?: boolean

  /**
   * @description Form 样式表现
   */
  variant?: FormVariant

  /**
   * @description 反馈图标(TODO: 类型待确定)
   */
  feedbackIcons?: any
}

export type DefaultNames = 'size' | 'colon' | 'layout' | 'variant' | 'disabled' | 'requiredMark'

export type PickedFormProps<S = any> = Pick<FormProps<S>, DefaultNames>

export type OmittedFormProps<S = any> = Omit<FormProps<S>, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultFormProps: Omit<PickedFormProps, 'disabled' | 'size'> = {
  colon: true,
  layout: 'horizontal',
  variant: 'outlined',
  requiredMark: true,
}

export const excludedFormProps = [
  // extends
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
  'ref',
  'form',
  'colon',
  'disabled',
  'layout',
  'size',
  'labelAlign',
  'labelWrap',
  'labelCol',
  'wrapperCol',
  'requiredMark',
  'scrollToFirstError',
] as const
