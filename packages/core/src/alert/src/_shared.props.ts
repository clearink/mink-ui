import type { ReactNode } from 'react'
import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { AlertProps } from './alert.props'

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface AlertGlobalConfig extends GetSemanticsConfig<AlertProps>,
  Pick<AlertProps, 'closable'> {
  /**
   * @description 成功图标
   */
  successIcon?: ReactNode

  /**
   * @description 信息图标
   */
  infoIcon?: ReactNode

  /**
   * @description 错误图标
   */
  errorIcon?: ReactNode

  /**
   * @description 警告图标
   */
  warningIcon?: ReactNode
}
