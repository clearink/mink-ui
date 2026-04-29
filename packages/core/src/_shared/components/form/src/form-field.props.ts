import type { ReactNode } from 'react'
import type { AnyObj, LiteralUnion } from '@mink-ui/shared/interface'
import type { InternalFormListContextState } from './_shared.context'
import type { ExternalFieldName, ExternalFormInstance, InternalFieldName, InternalMetaInfo, MetaChangeEvent, RuleLike } from './_shared.props'
import type { FormListControl } from './utils/list-control'

import { isObject } from '@mink-ui/shared/is/is-object'

type FunctionalChildren<V = any> = (params: AnyObj, meta: InternalMetaInfo, form: ExternalFormInstance<V>) => ReactNode

export interface InternalFormFieldProps<V = any> {
  /**
   * @description 子元素
   */
  children?: ReactNode | FunctionalChildren<V>

  /**
   * @description 字段名称，根据该字段设置对应 Form 属性
   */
  name: InternalFieldName

  /**
   * @description 字段默认值，优先级比 Form.initialValues 低
   */
  initialValue?: any

  /**
   * @description 字段校验规则
   */
  rule?: RuleLike

  /**
   * @description 字段删除时是否保留当前值
   */
  preserve?: boolean

  /**
   * @description 依赖字段（当依赖字段数值改变时，自动触发该字段的校验与刷新）
   */
  dependencies?: ExternalFieldName[]

  /**
   * @description 字段是否需要更新
   */
  shouldUpdate?: true | ((prev: any, next: any) => boolean)

  /**
   * @description 字段收集的时机
   * @default onChange
   */
  valueTrigger?: LiteralUnion<'onChange' | 'onBlur', string>

  /**
   * @description 注入到子组件中属性的名称
   */
  valuePropName?: string

  /**
   * @description 字段校验不通过时是否
   */
  validateFirst?: boolean

  /**
   * @description 字段校验的时机
   */
  validateTrigger?: false | string | string[]

  /**
   * @private
   * @description 标记该字段是否为 Form.List
   */
  isFormList?: false | { listControl: FormListControl }

  /**
   * @private
   * @description 标记该字段是否为 ListField 的子字段
   */
  isListField?: ({ type: 'simple' | 'complex' } & InternalFormListContextState) | false

  /**
   * @description 数值格式化函数
   */
  valueFormatter?: (next: any, prev: any, getValues: () => any) => any

  /**
   * @description 从事件处理函数中获取字段值
   */
  getValueFromEvent?: (...args: any[]) => any

  /**
   * @description 自定义添加到子元素的属性
   */
  getValueProps?: (value: any) => AnyObj

  /**
   * @description metaInfo 信息改变时的回调
   */
  onMetaChange?: (event: MetaChangeEvent) => void

  /**
   * @description 字段重置时的回调
   */
  onReset?: () => void
}

export interface GeneratedFormFieldProps<V = any> extends Omit<InternalFormFieldProps<V>, 'name' | 'isFormList' | 'isListField' | 'listControl'> {
  /**
   * @description 字段名称，根据该字段设置对应 Form 属性
   */
  name?: ExternalFieldName

  /**
   * @private
   * @description 标记该字段是否为 Form.ListField （一般情况下无需传入）
   */
  isListField?: false
}

export interface GeneratedFormListProps<V = any> extends GeneratedFormFieldProps<V> {
  /**
   * @private
   * @description Form.List 组件传入给 Form.Field 组件
   */
  listControl: FormListControl
}

export type DefaultNames = 'valueTrigger' | 'valuePropName' | 'validateTrigger' | 'getValueProps' | 'getValueFromEvent'

export type PickedInternalFormFieldProps<V = any> = Pick<InternalFormFieldProps<V>, DefaultNames>

export type OmittedInternalFormFieldProps<V = any> = Omit<InternalFormFieldProps<V>, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultInternalFormFieldProps: Pick<PickedInternalFormFieldProps, 'valueTrigger' | 'valuePropName'> = {
  valueTrigger: 'onChange',
  valuePropName: 'value',
}

export function defaultGetValueFromEvent(valuePropName: string) {
  return (...events: any[]) => {
    const event = events[0]

    if (!event || !isObject(event.target)) return event

    if (!(valuePropName in event.target)) return event

    return event.target[valuePropName as keyof EventTarget]
  }
}

export function defaultGetValueProps(valuePropName: string) {
  return (value: any) => ({ [valuePropName]: value })
}
