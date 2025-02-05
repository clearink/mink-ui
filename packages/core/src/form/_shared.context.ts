import type { ColProps } from '@mink-ui/core/col'

import { ctxHelper } from '@mink-ui/core/_shared/utils'
import { noop } from '@mink-ui/shared'

import type {
  FieldMeta,
  FormLabelAlign,
  FormLayout,
  RequiredMark,
  ValidateStatus,
} from './_shared.props'
import type { FormInstance } from './form/props'

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
export const NoStyleContext = ctxHelper<(meta: FieldMeta) => void>(noop, 'NoStyleContext')
