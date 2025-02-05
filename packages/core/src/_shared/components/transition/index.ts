import CssTransition from './css-transition'
import GroupTransition from './group-transition'
import SwitchTransition from './switch-transition'

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { CssTransitionProps, CssTransitionRef } from './css-transition/props'
export type { GroupTransitionProps, GroupTransitionRef } from './group-transition/props'
export type { SwitchTransitionProps } from './switch-transition/props'

export { CssTransition, GroupTransition, SwitchTransition }
