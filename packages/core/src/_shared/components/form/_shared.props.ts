import type { FormFieldControl } from './field/control'

export type InternalNamePath = (number | string)[]

export type ExternalNamePath = InternalNamePath | number | string

export interface InternalFieldMeta {
  dirty: boolean
  errors: string[]
  name: InternalNamePath
  touched: boolean
  // 是否正在校验
  validating: boolean
  // 是否校验过了
  validated: boolean
  warnings: string[]
}

export type MetaChangeEvent = { mounted: boolean } & InternalFieldMeta

export type InternalFieldInfo = { value: any } & InternalFieldMeta

export type InternalFieldErrorInfo = Pick<InternalFieldMeta, 'errors' | 'name' | 'warnings'>

export interface InternalFormValidateErrorInfo<S = any> {
  message: string
  values: S
  errorFields: { errors: string[], name: InternalNamePath }[]
  isExpired: boolean
}

export type ExternalFieldData = {
  name: ExternalNamePath
} & Partial<Omit<InternalFieldInfo, 'name'>>

export type WatchCallBack = () => void

export type FormActionType = FormAction['type']

export type FormAction =
  | {
    control: FormFieldControl
    fieldDisplay: any
    type: 'registerField'
  }
  | {
    control: FormFieldControl
    type: 'fieldEvent'
    value: any
  }
  | {
    control: FormFieldControl
    type: 'unregisterField'
  }
  | {
    fields: ExternalFieldData[]
    type: 'setFields'
  }
  | {
    nameList?: ExternalNamePath[]
    type: 'resetFields'
  }
  | {
    state: any
    type: 'setFieldsValue'
  }

export interface RuleOptions {
  abortEarly?: boolean
  path: InternalNamePath
  warningOnly?: boolean
}
export interface RuleIssue {
  message: any
}
export interface RuleLike {
  validate: (value: any, options?: RuleOptions) => Promise<any>
}

export type FieldCleanBehavior = 'clean' | 'keep' | 'none'
