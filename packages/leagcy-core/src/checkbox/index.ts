import _Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group/group'

// CompoundCheckbox
const Checkbox = Object.assign(_Checkbox, { Group: CheckboxGroup })

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { CheckboxProps } from './checkbox/props'

export { Checkbox }
export default Checkbox
