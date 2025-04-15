import type { InternalFormProviderContextState } from '../../_shared.context'
import type { ExternalNamePath, FormAction, InternalFieldErrorInfo, InternalFieldInfo, InternalFieldMeta, InternalNamePath, WatchCallBack } from '../../_shared.props'
import type { FormFieldControl } from '../../field/control'
import type { InternalFormProps } from '../props'

export type FilterFieldFunction = (meta: InternalFieldMeta) => boolean

export interface InternalFormInstance<S = any> {
  /**
   * @zh-CN 获取字段错误信息
   *
   */
  getFieldError: (namePath: ExternalNamePath) => string[]

  /**
   * @zh-CN 表单收集的数据
   */
  getFieldValue: (namePath: ExternalNamePath) => any

  /**
   * @zh-CN 获取一组字段错误信息
   */
  getFieldsError: (nameList?: ExternalNamePath[]) => InternalFieldErrorInfo[]

  /**
   * @zh-CN 表单收集的数据
   */
  getFieldsValue: GetFieldsValueFunction<S>

  /**
   * @private
   * @zh-CN 内部方法，外部禁止使用
   */
  getInternalHooks: (secret: symbol) => InternalHooksReturn<S> | undefined

  /**
   * @zh-CN 字段是否 touched 了
   */
  isFieldTouched: (namePath: ExternalNamePath) => boolean

  /**
   * @zh-CN 字段是否处于校验中
   */
  isFieldValidating: (namePath: ExternalNamePath) => boolean

  /**
   * @zh-CN 字段是否都 touched 了
   */
  isFieldsTouched: IsFieldsTouchedFunction

  /**
   * @zh-CN 字段是否都处于校验中
   */
  isFieldsValidating: (nameList?: ExternalNamePath[]) => boolean

  /**
   * @zh-CN 重置一组字段
   */
  resetFields: (nameList?: ExternalNamePath[]) => void

  /**
   * @zh-CN 设置表单字段数据
   */
  setFieldValue: (namePath: ExternalNamePath, value: any, shouldValidate?: boolean) => void

  /**
   * @zh-CN 设置表单数据
   */
  setFieldsValue: (value: Partial<S>, shouldValidate?: boolean) => void

  /**
   * @zh-CN 提交事件 自动调用 validate 方法
   */
  submitForm: () => void

  /**
   * @zh-CN 字段参数校验
   */
  validateField: (namePath: ExternalNamePath) => void

  /**
   * @zh-CN 参数校验
   */
  validateFields: ValidateFieldsFunction<S>
}

export interface InternalHooksReturn<State = any> {
  /**
   * @private
   * @zh-CN 字段需要更新时需要发布的事件
   */
  dispatch: (action: FormAction) => void

  /**
   * @private
   * @zh-CN 注册字段
   */
  registerField: (control: FormFieldControl, fieldDisplay: any) => (preserve?: boolean) => void

  /**
   * @private
   * @zh-CN 设置字段状态
   */
  setFields: (fields: InternalFieldInfo[]) => void

  /**
   * @private
   * @zh-CN 更新字段 Map 信息
   */
  updateControlsMap: (control: FormFieldControl, preName: InternalNamePath) => void

  /**
   * @private
   * @zh-CN 注册监听事件
   */
  registerWatch: (callback: WatchCallBack) => () => void

  /**
   * @private
   * @zh-CN 同步 form props 与父级表单实例
   */
  setInternalFormProps: (props: InternalFormProps, formProvider: InternalFormProviderContextState | null) => void

  /**
   * @private
   * @zh-CN 订阅依赖字段
   */
  collectDependencies: (control: FormFieldControl) => () => void

  /**
   * @private
   * @zh-CN 订阅依赖字段
   */
  updateDependencies: (control: FormFieldControl) => void

  /**
   * @private
   * @zh-CN 合并 Form 组件设置的默认值
   */
  mergeInitialValues: (initialValues: Partial<State> | undefined) => void

  /**
   * @private
   * @zh-CN 初始化字段初始值
   */
  initInitialValue: (control: FormFieldControl) => void
}

export type ExternalFormInstance<S = any> = Omit<InternalFormInstance<S>, 'getInternalHooks'>

export interface GetFieldsValueFieldMetaFilter {
  (meta: InternalFieldMeta | null): boolean
}

export interface GetFieldsValueConfig {
  strict?: boolean
  filter?: GetFieldsValueFieldMetaFilter
}

export interface GetFieldsValueFunction<S = any> {
  (original: true): S
  (nameList?: ExternalNamePath[], filter?: GetFieldsValueFieldMetaFilter): any
  (config: GetFieldsValueConfig): any
}

export interface IsFieldsTouchedFunction {
  (nameList?: ExternalNamePath[], allFieldsTouched?: boolean): any
  (allFieldsTouched?: boolean): any
}

export interface ValidateFieldsFunction<S = any> {
  (nameList?: ExternalNamePath[]): Promise<S>
}
