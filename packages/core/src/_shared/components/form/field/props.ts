import type { AnyObj } from '@mink-ui/shared'
import type { ReactNode } from 'react'

import type {
  ExternalNamePath,
  FormActionType,
  InternalFieldMeta,
  InternalNamePath,
  MetaChangeEvent,
  RuleLike,
} from '../_shared.props'
import type { ExternalFormInstance } from '../form/control/props'
import type FormListControl from '../list/control'

export interface InternalFormFieldProps<S = any> {
  children?:
  | ((
    control: AnyObj,
    metadata: InternalFieldMeta,
    formInstance: ExternalFormInstance<S>,
  ) => React.ReactNode)
  | ReactNode

  /**
   * @zh-CN 设置依赖字段
   */
  dependencies?: ExternalNamePath[]

  /**
   * @zh-CN 组件获取值后进行转换，再放入 Form 中。不支持异步
   */
  formatter?: (next: any, prev: any, getValues: () => S) => any

  /**
   * @zh-CN 设置如何将 event 的值转换成字段值
   */
  getValueFromEvent?: (...args: any[]) => any

  /**
   * @zh-CN 为子元素添加额外的属性
   */
  getValueProps?: (value: any) => any

  /**
   * @zh-CN 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准
   */
  initialValue?: S

  /**
   * @private
   * @zh-CN 字段是否为 Form.List 组件
   */
  isFormList?: boolean

  /**
   * @private
   * @zh-CN 字段是否为列表字段 complex 表示 list.0.xxx 之类的字段
   */
  isListField?: { listControl: FormListControl | undefined, listPath: InternalNamePath, type: 'complex' }
    | { listControl: FormListControl | undefined, listPath: InternalNamePath, type: 'simple' }
    | false

  /**
   * @zh-CN 字段路径
   */
  name: InternalNamePath

  /**
   * @zh-CN 字段状态变更通知
   */
  onMetaChange?: (meta: MetaChangeEvent) => void

  /**
   * @zh-CN 字段重置回调函数
   */
  onReset?: () => void

  /**
   * @zh-CN 字段删除时仍然保留数据
   */
  preserve?: boolean

  /**
   * @zh-CN 校验规则，设置字段的校验逻辑
   */
  rule?: RuleLike

  /**
   * @zh-CN 自定义字段更新逻辑，说明[见下](#shouldUpdate)
   * @default false
   */
  shouldUpdate?: ((prev: S, next: S, action: FormActionType) => boolean) | true

  /**
   * @zh-CN 收集字段时机
   * @default onChange
   */
  trigger?: string

  /**
   * @zh-CN 当某一规则校验不通过时，是否停止剩下的规则的校验
   * @default false
   */
  validateFirst?: boolean

  /**
   * @zh-CN 设置字段校验的时机
   * @default onChange
   */
  validateTrigger?: false | string | string[]

  /**
   * @zh-CN 注入属性名称
   * @default value
   */
  valuePropName?: string
}

export interface ExternalFormFieldProps<S = any> extends Omit<InternalFormFieldProps<S>, 'isListField' | 'name'> {
  /**
   * @zh-CN 字段路径
   */
  name?: ExternalNamePath
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultInternalFormFieldProps: Partial<InternalFormFieldProps> = {
  trigger: 'onChange',
  valuePropName: 'value',
}
