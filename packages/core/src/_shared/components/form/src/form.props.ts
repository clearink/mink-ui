import type { ComponentType, FormEvent, FormHTMLAttributes, ReactNode, Ref } from 'react'
import type { AnyObj } from '@mink-ui/shared/interface'
import type { ExternalFieldInfo, ExternalFormInstance, InternalFormInstance, InternalFormValidateErrorInfo, RuleLike } from './_shared.props'

type FunctionalChildren<S> = (state: unknown, form: InternalFormInstance<S>) => ReactNode

export interface InternalFormProps<S = any> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  /**
   * @description 外部引用
   */
  ref?: { nativeElement?: HTMLElement } & Ref<ExternalFormInstance<S>>

  /**
   * @description 子元素
   */
  children?: ReactNode | FunctionalChildren<S>

  /**
   * @description useForm 返回值，不提供时会自动创建
   */
  form?: ExternalFormInstance<S>

  /**
   * @description 字段初始化值，仅在字段挂载时生效
   */
  initialValues?: Partial<S>

  /**
   * @description 字段校验
   */
  rules?: Record<string, RuleLike>

  /**
   * @description 字段卸载时是否保留数据，会透传到该 form 组件下所有的 field
   */
  preserve?: boolean

  /**
   * @description Form 渲染元素，为 null 则不创建 DOM 节点
   */
  component?: string | ComponentType<AnyObj> | null

  /**
   * @description 字段出发验证的时机
   */
  validateTrigger?: false | string | string[]

  /**
   * @description 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用
   */
  fields?: ExternalFieldInfo[]

  /**
   * @description 表单名称, FormProvider 使用
   */
  name?: string

  /**
   * @description 校验信息
   */
  validateMessages?: AnyObj

  /**
   * @description 校验成功后的回调
   */
  onFinish?: (values: S) => void

  /**
   * @description 校验失败后的回调
   */
  onFailed?: (errors?: InternalFormValidateErrorInfo<S>) => void

  /**
   * @description 表单重置回调
   */
  onReset?: (event: FormEvent<HTMLFormElement>) => void

  /**
   * @description 字段值变更时的回调, 仅在用户操作表单项时触发
   */
  onValuesChange?: (changedValues: Partial<S>, values: S) => void

  /**
   * @description 字段变更时的回调, 仅在用户操作表单时触发
   */
  onFieldsChange?: (changedFields: ExternalFieldInfo[], getFields: () => ExternalFieldInfo[]) => void
}

export type DefaultNames = 'preserve' | 'component' | 'validateTrigger'

export type PickedInternalFormProps<S = any> = Pick<InternalFormProps<S>, DefaultNames>

export type OmittedInternalFormProps<S = any> = Omit<InternalFormProps<S>, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultInternalFormProps: PickedInternalFormProps = {
  preserve: true,
  component: 'form',
  validateTrigger: 'onChange',
}

export const excludedInternalFormProps = [
  // extends

  // props
  'ref',
  'children',
  'form',
  'initialValues',
  'rules',
  'preserve',
  'component',
  'validateTrigger',
  'fields',
  'name',
  // events
  'onFinish',
  'onFailed',
  'onReset',
  'onValuesChange',
  'onFieldsChange',
] as const
