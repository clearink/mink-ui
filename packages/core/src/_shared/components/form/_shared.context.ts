import type { AnyObj } from '@mink-ui/shared'

import { noop } from '@mink-ui/shared'

import type { ExternalFieldData, InternalNamePath } from './_shared.props'
import type { ExternalFormInstance, InternalFormInstance } from './form/control/props'
import type { InternalFormProps } from './form/props'

import { ctxHelper, logger } from '../../../_shared/utils'

export interface InternalFormProviderContextState {
  register: (form: ExternalFormInstance, name?: string) => () => void
  triggerFormChange: (name: string, changedFields: ExternalFieldData[]) => void
  triggerFormFinish: (name: string, values: AnyObj) => void
}

// Form 组件联动
export const InternalFormProviderContext = ctxHelper<InternalFormProviderContextState>({
  register: () => noop,
  triggerFormChange: noop,
  triggerFormFinish: noop,
}, 'InternalFormContext')

const notFoundContext: any = () => {
  if (process.env.NODE_ENV !== 'production')
    logger(true, 'Can not find FormContext. Please make sure you wrap Field under Form.')
}

export const InternalFormInstanceContext = ctxHelper<InternalFormInstance>({
  getFieldError: notFoundContext,
  getFieldValue: notFoundContext,
  getFieldsError: notFoundContext,
  getFieldsValue: notFoundContext,
  getInternalHooks: () => ({
    dispatch: notFoundContext,
    registerField: notFoundContext,
    setFields: notFoundContext,
    updateControlsMap: notFoundContext,
    registerWatch: notFoundContext,
    setInternalFormProps: notFoundContext,
    collectDependencies: notFoundContext,
    updateDependencies: notFoundContext,
    mergeInitialValues: notFoundContext,
    initInitialValue: notFoundContext,
  }),
  isFieldTouched: notFoundContext,
  isFieldValidating: notFoundContext,
  isFieldsTouched: notFoundContext,
  isFieldsValidating: notFoundContext,
  resetFields: notFoundContext,
  setFieldValue: notFoundContext,
  setFieldsValue: notFoundContext,
  submitForm: notFoundContext,
  validateField: notFoundContext,
  validateFields: notFoundContext,
}, 'InternalFormInstanceContext')

// 由 Form 组件传递给 Field 组件的某些属性
export interface InternalFormContextState {
  validateTrigger: InternalFormProps['validateTrigger']
}

export const InternalFormContext = ctxHelper<InternalFormContextState>({
  validateTrigger: undefined,
})

export interface InternalFormListContextState {
  listPath: InternalNamePath
}

// Form.List 组件传递给 Form.Item 组件的某些属性
export const InternalFormListContext = ctxHelper<InternalFormListContextState | null>(
  null,
  'InternalFormListContext',
)
