import type { ComponentType, FormEvent, FormHTMLAttributes, ReactNode } from 'react'

import type { InternalFieldData } from '../_shared.props'
import type { ExternalFormInstance } from './control/props'

export interface InternalFormProps<S = any>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  children?: ((values: S, form: ExternalFormInstance) => ReactNode) | ReactNode

  /**
   * @zh-CN 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用
   */
  fields?: InternalFieldData[]

  /**
   * @zh-CN useForm 返回值，不传会自动创建
   */
  form?: ExternalFormInstance<S>

  /**
   * @zh-CN 字段初始化值，仅在字段挂载时生效
   */
  initialValues?: Partial<S>

  /**
   * @zh-CN 校验失败后的回调
   */
  onFailed?: (errors: any) => void

  /**
   * @zh-CN 字段变更时的回调, 仅在用户操作表单项时触发
   */
  onFieldsChange?: (
    changedFields: InternalFieldData[],
    getFields: () => InternalFieldData[],
  ) => void

  /**
   * @zh-CN 校验成功后的回调
   */
  onFinish?: (values: S) => void

  /**
   * @zh-CN 表单重置回调
   */
  onReset?: (e: FormEvent) => void

  /**
   * @zh-CN 字段值更时的回调, 仅在用户操作表单时触发
   */
  onValuesChange?: (changedValues: any, getValues: () => S) => void

  /**
   * @zh-CN 字段删除时仍然保留数据
   * @default true
   */
  preserve?: boolean

  /**
   * @zh-CN 设置 Form 渲染元素，为 null 则不创建 DOM 节点
   * @default form
   */
  tag?: ComponentType | keyof HTMLElementTagNameMap | null

  /**
   * @zh-CN 统一设置字段触发验证的时机
   * @default onChange
   */
  validateTrigger?: false | string | string[]

  /**
   * @zh-CN 数据校验规则，根据字段名分配给不同的 field
   */
  validationSchema?: any // BaseSchema<S>
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultInternalFormProps: Partial<InternalFormProps> = {
  preserve: true,
  tag: 'form',
  validateTrigger: 'onChange',
}
