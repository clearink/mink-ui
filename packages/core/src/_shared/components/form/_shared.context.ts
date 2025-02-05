import type { AnyObj } from '@mink-ui/shared'

import { ctxHelper, logger } from '@mink-ui/core/_shared/utils'
import { noop } from '@mink-ui/shared'

import type { ExternalFieldData } from './_shared.props'
import type { ExternalFormInstance, InternalFormInstance } from './form/control/props'

export interface InternalFormContextState {
  register: (form: ExternalFormInstance, name?: string) => () => void
  triggerFormChange: (name: string, changedFields: ExternalFieldData[]) => void
  triggerFormFinish: (name: string, values: AnyObj) => void
}

// Form 组件传递数据给 Form.Field
export const InternalFormContext = ctxHelper<InternalFormContextState>({
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
    ensureInitialized: notFoundContext,
    getControl: notFoundContext,
    metaUpdate: notFoundContext,
    registerField: notFoundContext,
    registerSubscribe: notFoundContext,
    registerWatch: notFoundContext,
    setFields: notFoundContext,
    setInitialValues: notFoundContext,
    setInternalFormMisc: notFoundContext,
    setPreserve: notFoundContext,
    subscribe: notFoundContext,
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
