import type { ReactNode } from 'react'
import type {
  InternalFormListProps,
  InternalListField,
  InternalListHelpers,
  InternalMetaInfo,
} from '../../_shared/components/form/src'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'

export interface FormListProps extends Omit<InternalFormListProps, 'children'>, Pick<HasSemanticsStyled<never>, 'prefixCls'> {
  /**
   * @description 渲染函数
   */
  children: (fields: InternalListField[], helpers: InternalListHelpers, meta: Pick<InternalMetaInfo, 'warnings' | 'errors'>) => ReactNode
}
