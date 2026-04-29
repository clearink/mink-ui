import type { AnyObj } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../../types'
import type { ExternalFieldInfo, ExternalFormInstance } from './_shared.props'
import type { InternalFormProps } from './form.props'

export type Forms = Record<string, ExternalFormInstance>

export interface FormChangeInfo {
  forms: Forms
  changedFields: ExternalFieldInfo[]
}

export interface FormFinishInfo {
  forms: Forms
  values: AnyObj
}

export interface InternalFormProviderProps extends HasChildren, Pick<InternalFormProps, 'validateMessages'> {
  /**
   * @description 表单数据改变
   */
  onFormChange?: (name: string, info: FormChangeInfo) => void

  /**
   * @description 表单校验成功
   */
  onFormFinish?: (name: string, info: FormFinishInfo) => void
}
