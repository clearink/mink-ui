import type { ReactNode } from 'react'
import type { ExternalFieldName, InternalMetaInfo } from './_shared.props'
import type { GeneratedFormListProps } from './form-field.props'

type FunctionalChildren = (fields: InternalListField[], helpers: InternalListHelpers, meta: InternalMetaInfo) => ReactNode

export interface InternalListField {
  key: number
  name: number
}

export interface InternalListHelpers {
  append: (value?: unknown) => void
  insert: (index: number, value: any) => void
  move: (from: number, to: number) => void
  prepend: (value?: any) => void
  remove: (index?: number | number[]) => void
  replace: (index: number, value: any) => void
  swap: (from: number, to: number) => void
}

export interface InternalFormListProps extends Pick<GeneratedFormListProps, 'rule' | 'isListField'> {
  /**
   * @description 子元素
   */
  children: FunctionalChildren

  /**
   * @description 字段名称，根据该字段设置对应 Form 属性
   */
  name: ExternalFieldName

  /**
   * @description 字段默认值，优先级比 Form.initialValues 低
   */
  initialValue?: unknown[]
}
