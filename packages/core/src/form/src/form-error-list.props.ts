import type { ReactNode } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { ValidateStatus } from './_shared.props'

export interface FormErrorListProps extends Pick<HasSemanticsStyled<never>, 'className' | 'style'> {
  /**
   * @description 字段唯一 id
   */
  itemId?: string

  /**
   * @description 告警信息
   */
  warnings?: ReactNode[]

  /**
   * @description 错误信息
   */
  errors?: ReactNode[]

  /**
   * @description 提示信息
   */
  help?: ReactNode

  /**
   * @description 提示状态
   */
  helpStatus?: ValidateStatus

  /**
   * @description 动画结束回调
   */
  onGroupExited?: VoidFn
}
