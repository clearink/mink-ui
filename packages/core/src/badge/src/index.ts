import _Badge from './badge'
import Ribbon from './badge-ribbon'

// CompoundBadge
const Badge = Object.assign(_Badge, { Ribbon })

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { BadgeRibbonProps } from './badge-ribbon.props'
export type { BadgeProps } from './badge.props'

export { Badge }
export default Badge
