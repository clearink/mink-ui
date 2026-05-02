import type { ReactNode } from 'react'
import type { ExternalFieldName, InternalListField, InternalListHelpers, InternalMetaInfo } from './_shared.props'
import type { GeneratedFormListProps } from './form-field.props'

export interface InternalFormListProps extends Pick<GeneratedFormListProps, 'rule' | 'isListField'> {
  /**
   * @description 子元素
   */
  children: (fields: InternalListField[], helpers: InternalListHelpers, meta: InternalMetaInfo) => ReactNode

  /**
   * @description 字段名称，根据该字段设置对应 Form 属性
   */
  name: ExternalFieldName

  /**
   * @description 字段默认值，优先级比 Form.initialValues 低
   */
  initialValue?: unknown[]
}
