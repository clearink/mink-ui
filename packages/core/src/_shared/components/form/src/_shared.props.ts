import type { AnyObj, VoidFn } from '@mink-ui/shared/interface'
import type { InternalFormProviderContextState, InternalFormSharedContextState } from './_shared.context'
import type { ScheduleCallback } from './form-scheduler.props'
import type { OmittedInternalFormProps, PickedInternalFormProps } from './form.props'
import type { FormFieldControl } from './utils/field-control'
import type { FormListControl } from './utils/list-control'

/**
 * @description 内部使用的表单路径
 */
export type InternalFieldName = (string | number)[]

/**
 * @description 外部使用的表单路径
 */
export type ExternalFieldName = InternalFieldName | InternalFieldName[number]

/**
 * @description 内部使用的字段 meta 信息
 */
export interface InternalMetaInfo {
  /**
   * @description 字段名
   */
  name: InternalFieldName
  /**
   * @description 字段是否被 touched 过
   */
  touched: boolean
  /**
   * @description 字段是否正在校验
   */
  validating: boolean
  /**
   * @description 字段是否已经校验过
   */
  validated: boolean
  /**
   * @description 字段校验告警信息
   */
  warnings: any[]
  /**
   * @description 字段校验错误信息
   */
  errors: any[]
}

/**
 * @description 字段所有信息
 */
export interface InternalFieldInfo extends InternalMetaInfo {
  /**
   * @description 字段值
   */
  value: any
}

/**
 * @description 外部使用的字段信息
 */
export interface ExternalFieldInfo extends Partial<Omit<InternalFieldInfo, 'name'>> {
  name: ExternalFieldName
}

/**
 * @description 字段 meta 信息变化事件 event
 */
export interface MetaChangeEvent extends InternalMetaInfo {
  mounted: boolean
}

/**
 * @description 字段错误信息
 */
export type InternalErrorInfo = Pick<InternalMetaInfo, 'name' | 'warnings' | 'errors'>

/**
 * @description 表单校验错误信息
 */
export interface InternalFormValidateErrorInfo<S = any> {
  /**
   * @description 表单值
   */
  values: S
  /**
   * @description 错误信息
   */
  message: string
  /**
   * @description 已过期
   */
  isExpired: boolean
  /**
   * @description 错误字段信息
   */
  errorFields: Pick<InternalFieldInfo, 'errors' | 'name'>[]
}

/**
 * @description 监听回调
 */
export type WatchCallBack = (values: any) => void

export type ScheduleTasks = Partial<Record<
'cleanup' | 'events' | 'update' | 'publish',
{ priority: number, handler: VoidFn }
>>

export type ScheduleFunction = <K extends keyof ScheduleTasks>(
  key: K,
  priority: number,
  factory: (tasks: ScheduleTasks) => void,
) => void

/**
 * @description 表单校验规则配置项
 */
export interface RuleValidateOptions {
  /**
   * @description 失败时立即退出后续校验
   */
  abortEarly?: boolean
  /**
   * @description 字段路径
   */
  path: InternalFieldName
  /**
   * @description 校验只生成警告信息
   */
  warningOnly?: boolean
}
/**
 * @description 通用表单检验规则实例属性
 */
export interface RuleLike {
  validate: (value: any, options?: RuleValidateOptions) => Promise<any>
}

/**
 * @description 表单调度 action
 */
export type DispatchAction
  = {
    type: 'fieldInitial'
    control: FormFieldControl
    transient: any
  }
  | {
    type: 'fieldCleanup'
    control: FormFieldControl
  }
  | {
    type: 'fieldEvent'
    control: FormFieldControl
    value: any
  }
  | {
    type: 'resetFields'
    nameList?: ExternalFieldName[]
  }
  | {
    type: 'setFieldsValue'
    values: any
  }
  | {
    type: 'setFieldsInfo'
    fields: ExternalFieldInfo[]
  }

/**
 * @description 获取字段值选项
 */
export interface GetFieldsValueOptions {
  filter?: GetFieldsValueFieldMetaFilter
}

/**
 * @description 获取字段值时过滤方法
 */
export interface GetFieldsValueFieldMetaFilter {
  (meta: InternalMetaInfo | null): boolean
}

/**
 * @description 获取字段值时的入参
 */
export interface GetFieldsValueFunction<S = any> {
  (original: true): S
  (nameList?: ExternalFieldName[], filter?: GetFieldsValueFieldMetaFilter): any
  (config: GetFieldsValueOptions): any
}

/**
 * @description 校验字段入参
 */
export interface ValidateFieldsFunction<S = any> {
  (nameList?: ExternalFieldName[]): Promise<S>
}

/**
 * @description 判断字段是否 touched 入参
 */
export interface IsFieldsTouchedFunction {
  (nameList?: ExternalFieldName[], allFieldsTouched?: boolean): any
  (allFieldsTouched?: boolean): any
}

/**
 * @description 一些内部使用的方法
 */
export interface InternalHooksReturn<S = any> {
  /**
   * @description 调度方法
   */
  dispatch: (action: DispatchAction) => void

  /**
   * @description 注册字段
   */
  registerField: (control: FormFieldControl, transient: any) => VoidFn

  /**
   * @description 注册监听事件
   */
  registerWatch: (callback: WatchCallBack) => VoidFn

  /**
   * @description 注册批量调度器
   */
  registerScheduler: (callback: ScheduleCallback) => void

  /**
   * @description 设置一组字段信息
   */
  setFieldsInfo: (fields: ExternalFieldInfo[]) => void

  /**
   * @description 更新内部状态
   */
  updateInternals: (
    picked: PickedInternalFormProps<S>,
    omitted: OmittedInternalFormProps<S>,
    provider: InternalFormProviderContextState | null,
    shared: InternalFormSharedContextState | null,
  ) => void

  /**
   * @description 设置字段初始值 (同时返回当前字段值)
   */
  defineInitialValue: (control: FormFieldControl) => any

  /**
   * @description 更新字段 map
   */
  updateControlsMap: (control: FormFieldControl, preName: InternalFieldName) => void

  /**
   * @description 更新依赖字段
   */
  updateFieldGraph: (control: FormFieldControl) => void

  /**
   * @description 保存内部字段信息
   */
  saveInternalFields: (fields?: ExternalFieldInfo[]) => void

  /**
   * @description 设置 Form 各种初始值
   */
  defineFormInitials: (initialValues: Partial<S> | undefined, fields: ExternalFieldInfo[] | undefined) => void

  /**
   * @description 获取 isFormList = true 的指定字段
   */
  getFormListControl: (listControl: FormListControl, name: InternalFieldName) => FormFieldControl | undefined
}

/**
 * @description 表单实例
 */
export interface InternalFormInstance<S = any> {
  /**
   * @private
   * @description 获取内部方法
   */
  getInternalHooks: (secret: symbol) => InternalHooksReturn<S> | undefined

  /**
   * @description 获取字段错误信息
   */
  getFieldError: (name: ExternalFieldName) => string[]

  /**
   * @description 获取一组字段的错误信息
   */
  getFieldsError: (nameList?: ExternalFieldName[]) => InternalErrorInfo[]

  /**
   * @description 获取字段值
   */
  getFieldValue: (name: ExternalFieldName) => any

  /**
   * @description 获取一组字段值
   */
  getFieldsValue: GetFieldsValueFunction<S>

  /**
   * @description 设置字段值
   */
  setFieldValue: (name: ExternalFieldName, value: any) => void

  /**
   * @description 设置一组字段值
   */
  setFieldsValue: (values: AnyObj, shouldValidateFields?: boolean) => void

  /**
   * @description 校验字段
   */
  validateField: (name: ExternalFieldName) => void

  /**
   * @description 校验一组字段
   */
  validateFields: ValidateFieldsFunction<S>

  /**
   * @description 字段是否被 touched 过
   */
  isFieldTouched: (name: ExternalFieldName) => boolean

  /**
   * @description 一组字段是否被 touched 过
   */
  isFieldsTouched: IsFieldsTouchedFunction

  /**
   * @description 字段是否校验中
   */
  isFieldValidating: (name: ExternalFieldName) => boolean

  /**
   * @description 一组字段是否校验中
   */
  isFieldsValidating: (nameList: ExternalFieldName[]) => boolean

  /**
   * @description 重置一组字段
   */
  resetFields: (nameList?: ExternalFieldName[]) => void

  /**
   * @description 表单提交
   */
  submitForm: VoidFn
}

/**
 * @description 外部使用的表单实例
 */
export type ExternalFormInstance<S = any> = Omit<InternalFormInstance<S>, 'getInternalHooks'>
