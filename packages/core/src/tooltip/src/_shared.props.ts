import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { TooltipProps } from './tooltip.props'

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface TooltipGlobalConfig extends GetSemanticsConfig<TooltipProps>,
  Pick<TooltipProps, 'arrow' | 'trigger'> {
  /**
   * @description 共用一个 tooltip 实例
   */
  shared?: boolean
}
