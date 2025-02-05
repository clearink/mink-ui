import _Button from './button'
import ButtonGroup from './button-group'

// CompoundButton
const Button = Object.assign(_Button, { Group: ButtonGroup })

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { ButtonProps } from './button/props'
export type { ButtonGroupProps } from './button-group/props'

export { Button }
export default Button
