import _Collapse from './collapse'
import CollapseItem from './collapse-item'

// CompoundCollapse
const Collapse = Object.assign(_Collapse, { Item: CollapseItem })

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { CollapseProps } from './collapse/props'
export type { CollapseItemProps } from './collapse-item/props'

export { Collapse }
export default Collapse
