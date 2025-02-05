import _Badge from './badge'
import Ribbon from './badge-ribbon'

const Badge = Object.assign(_Badge, { Ribbon })

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { BadgeProps } from './badge/props'
export type { BadgeRibbonProps } from './badge-ribbon/props'

export { Badge }
export default Badge
