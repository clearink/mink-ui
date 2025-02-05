import type { InternalFormContextState } from '../../_shared.context'
import type {
  ExternalNamePath,
  FormAction,
  InternalFieldData,
  InternalNamePath,
  WatchCallBack,
} from '../../_shared.props'
import type { FormFieldControl, InvalidFieldControl } from '../../field/control'
import type { InternalFormProps } from '../props'

export interface InternalFormInstance<S = any> {
  /**
   * @zh-CN 获取字段错误信息
   *
   */
  getFieldError: (field: ExternalNamePath) => string[]

  /**
   * @zh-CN 表单收集的数据
   */
  getFieldValue: (namePath: ExternalNamePath) => any

  /**
   * @zh-CN 获取一组字段错误信息
   */
  getFieldsError: (
    fields?: ExternalNamePath[],
  ) => Pick<InternalFieldData, 'errors' | 'name' | 'warnings'>[]

  /**
   * @zh-CN 表单收集的数据
   */
  getFieldsValue: (fields?: ExternalNamePath[] | true) => S

  /**
   * @private
   * @zh-CN 内部方法，外部禁止使用
   */
  getInternalHooks: (secret: symbol) => InternalHookReturn<S> | undefined

  /**
   * @zh-CN 字段是否 touched 了
   */
  isFieldTouched: (field: ExternalNamePath) => boolean

  /**
   * @zh-CN 字段是否处于校验中
   */
  isFieldValidating: (field: ExternalNamePath) => boolean

  /**
   * @zh-CN 字段是否都 touched 了
   */
  isFieldsTouched: (fields?: ExternalNamePath[]) => boolean

  /**
   * @zh-CN 字段是否都处于校验中
   */
  isFieldsValidating: (fields?: ExternalNamePath[]) => boolean

  /**
   * @private
   * @zh-CN FormList 使用
   */
  listPath?: InternalNamePath

  /**
   * @zh-CN 重置一组字段到 `initialValues`
   */
  resetFields: (fields?: ExternalNamePath[]) => void

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
  validateFields: (namePath?: ExternalNamePath[]) => Promise<S>

  /**
   * @private
   * @zh-CN 设置字段校验时的时机
   */
  validateTrigger?: false | string | string[]
}

export interface InternalHookReturn<State = any> {
  /**
   * @private
   * @zh-CN 字段需要更新时需要发布的事件
   */
  dispatch: (action: FormAction) => void

  /**
   * @private
   * @zh-CN 更新字段默认值
   */
  ensureInitialized: (control: FormFieldControl) => void

  /**
   * @private
   * @zh-CN 根据名称设置 fieldMeta 属性
   */
  metaUpdate: (namePath: ExternalNamePath, meta: Partial<InternalFieldData>) => void
  /**
   * @private
   * @zh-CN 注册字段
   */
  registerField: (control: FormFieldControl) => (preserve?: boolean) => void

  /**
   * @private
   * @zh-CN 注册监听事件
   */
  registerWatch: (callback: WatchCallBack) => () => void

  /**
   * @private
   * @zh-CN 订阅依赖字段
   */

  /**
   * @private
   * @zh-CN 设置字段状态
   */
  setFields: (fields: InternalFieldData[]) => void

  /**
   * @private
   * @zh-CN 设置默认值
   */
  setInitialValues: (initial: Partial<State> | undefined) => void

  /**
   * @private
   * @zh-CN 同步 form 参数
   */
  setInternalFormMisc: (props: InternalFormProps, parent: InternalFormContextState) => void

  subscribe: (control: FormFieldControl) => () => void
}

export type ControlFindReturn<R extends boolean> = R extends true
  ? FormFieldControl[]
  : (FormFieldControl | InvalidFieldControl)[]

export type ExternalFormInstance<S = any> = Omit<
  InternalFormInstance<S>,
  'getInternalHooks' | 'listPath' | 'validateTrigger'
>
