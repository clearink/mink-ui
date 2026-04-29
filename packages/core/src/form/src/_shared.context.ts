import type { CSSProperties, ReactNode } from 'react'
import type { FieldName, FormInstance, MetaChangeHandler, ValidateStatus } from './_shared.props'
import type { FormProps } from './form.props'

import { noop } from '@mink-ui/shared/function/noop'

import { ctxHelper } from '../../_shared/utils/ctx-helper'

export interface FormPropsContextState extends
  Pick<
    FormProps,
    'form'
    | 'colon'
    | 'labelAlign'
    | 'labelWrap'
    | 'labelCol'
    | 'wrapperCol'
    | 'layout'
    | 'requiredMark'
    | 'name'
  > {
  classNames?: Partial<Record<'label' | 'input', string>>

  styles?: Partial<Record<'label' | 'input', CSSProperties>>
}

/**
 * @description 透传给 Field 组件的 Form 参数
 */
export const FormPropsContext = ctxHelper<FormPropsContextState>('FormPropsContext', {
  layout: 'horizontal',
  labelAlign: 'right',
})

/**
 * @description Form 实例
 */
export const FormInstanceContext = ctxHelper<FormInstance | null>('FormInstanceContext', null)

export type PureItemContextState = MetaChangeHandler

/**
 * @description pure 模式下，错误信息透传给上层 Form.Item
 */
export const PureItemContext = ctxHelper<PureItemContextState>('PureItemContext', noop)

export interface FormItemStatusContextState {
  /**
   * @description 字段名称
   */
  name?: FieldName
  /**
   * @description 告警信息
   */
  warnings?: ReactNode[]
  /**
   * @description 错误信息
   */
  errors?: ReactNode[]
  /**
   * @description 校验状态
   */
  status?: ValidateStatus
  /**
   * @description 是否有反馈
   */
  hasFeedback?: boolean
  /**
   * @description 反馈图标
   */
  feedbackIcon?: ReactNode
  /**
   * @description 是否受 Form.Item 控制
   */
  controlled?: boolean
}

/**
 * @description FormItem 组件往下透传的属性，包含字段校验状态
 */
export const FormItemStatusContext = ctxHelper<FormItemStatusContextState>('FormItemStatusContext', {})

export interface ErrorListContextState {
  /**
   * @description FormItem 语义化样式前缀
   */
  rootNamespace?: string

  /**
   * @description 字段校验状态
   */
  status?: ValidateStatus
}

/**
 * @description 传递给 ErrorList 组件的属性
 */
export const ErrorListContext = ctxHelper<ErrorListContextState>('ErrorListContext', {})
