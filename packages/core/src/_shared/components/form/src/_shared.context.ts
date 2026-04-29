import type { ExternalFieldInfo, ExternalFormInstance, InternalFieldName, InternalFormInstance } from './_shared.props'
import type { InternalFormProps } from './form.props'
import type { FormListControl } from './utils/list-control'

import { ctxHelper } from '../../../utils/ctx-helper'
import { logger } from '../../../utils/logger'

function notFoundContext(): any {
  if (process.env.NODE_ENV !== 'production') {
    logger.error('InternalForm', 'Can not find InternalFormInstanceContext. Please make sure you have wrapped Field under Form.')
  }
}

export interface InternalFormSharedContextState extends Pick<InternalFormProps, 'validateMessages'> {
}

export const InternalFormSharedContext = ctxHelper<InternalFormSharedContextState | null>('InternalFormSharedContext', null)

export interface InternalFormProviderContextState {
  register: (form: ExternalFormInstance, name?: string) => void
  triggerFormChange: (name: string, changedFields: ExternalFieldInfo[]) => void
  triggerFormFinish: (name: string, values: any) => void
}

/**
 * @description 表单联动时传递给子组件的参数
 */
export const InternalFormProviderContext = ctxHelper<InternalFormProviderContextState | null>('InternalFormProviderContext', null)

/**
 * @description 传递 FormInstance 给 Field 组件
 */
export const InternalFormInstanceContext = ctxHelper<InternalFormInstance>('InternalFormInstanceContext', {
  getFieldError: notFoundContext,
  getFieldsError: notFoundContext,
  getFieldValue: notFoundContext,
  getFieldsValue: notFoundContext,
  setFieldValue: notFoundContext,
  setFieldsValue: notFoundContext,
  validateField: notFoundContext,
  validateFields: notFoundContext,
  isFieldTouched: notFoundContext,
  isFieldsTouched: notFoundContext,
  isFieldValidating: notFoundContext,
  isFieldsValidating: notFoundContext,
  resetFields: notFoundContext,
  submitForm: notFoundContext,
  getInternalHooks: () => ({
    dispatch: notFoundContext,
    registerField: notFoundContext,
    registerWatch: notFoundContext,
    registerScheduler: notFoundContext,
    setFieldsInfo: notFoundContext,
    updateInternals: notFoundContext,
    defineInitialValue: notFoundContext,
    updateControlsMap: notFoundContext,
    updateFieldGraph: notFoundContext,
    saveInternalFields: notFoundContext,
    defineFormInitials: notFoundContext,
    getFormListControl: notFoundContext,
  }),
})

export interface InternalFormPropsContextState {
  validateTrigger: InternalFormProps['validateTrigger']
}

/**
 * @description 透传给 Field 组件的 Form 参数
 */
export const InternalFormPropsContext = ctxHelper<InternalFormPropsContextState>('InternalFormPropsContext', {
  validateTrigger: undefined,
})

export interface InternalFormListContextState {
  /**
   * @description 列表名称
   */
  listName: InternalFieldName

  /**
   * @description 唯一 id
   */
  listId: string

  /**
   * @description 列表 control
   */
  listControl: FormListControl
}

/**
 * @description 透传给 Field 组件的 FormList 参数
 */
export const InternalFormListContext = ctxHelper<InternalFormListContextState | null>('InternalFormListContext', null)
