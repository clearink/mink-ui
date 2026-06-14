import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { BadgeProps } from './badge.props'

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface BadgeGlobalConfig extends GetSemanticsConfig<BadgeProps>,
  Pick<BadgeProps, 'overflowCount'> {}
