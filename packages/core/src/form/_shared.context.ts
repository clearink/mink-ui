import { noop } from '@mink-ui/shared'

import type { ColProps } from '../col'
import type {
  FormLabelAlign,
  FormLayout,
  MetaChangeEvent,
  RequiredMark,
  ValidateStatus,
} from './_shared.props'
import type { FormInstance } from './form/props'

import { ctxHelper } from '../_shared/utils'

export interface FormContextState {
  colon?: boolean
  form?: FormInstance
  formName?: string
  labelAlign?: FormLabelAlign
  labelCol?: ColProps
  labelWrap?: boolean
  layout?: FormLayout
  requiredMark?: RequiredMark
  wrapperCol?: ColProps
}

export const FormContext = ctxHelper<FormContextState>({
  labelAlign: 'right',
  layout: 'horizontal',
}, 'FormContext')

export interface FormItemContextState {
  validateStatus?: ValidateStatus
}

export const FormItemContext = ctxHelper<FormItemContextState>({}, 'FormItemContext')

// 收集子字段的 errors 与 warnings

// 收集 noStyle 字段的错误到最近的Form.Item组件上
export const NoStyleContext = ctxHelper<(meta: MetaChangeEvent) => void>(noop, 'NoStyleContext')
