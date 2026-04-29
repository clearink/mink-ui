import type { ReactNode } from 'react'
import type {
  InternalFormListProps,
  InternalListField,
  InternalListHelpers,
  InternalMetaInfo,
} from '../../_shared/components/form/src'
import type { SemanticsStyled } from '../../_shared/types'

export interface FormListProps extends Omit<InternalFormListProps, 'children'>, Pick<SemanticsStyled<''>, 'prefixCls'> {
  /**
   * @description 渲染函数
   */
  children: (fields: InternalListField[], helpers: InternalListHelpers, meta: Pick<InternalMetaInfo, 'warnings' | 'errors'>) => ReactNode

}
