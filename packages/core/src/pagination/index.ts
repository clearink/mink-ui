import _Pagination from './pagination'
import PaginationItem from './pagination-item'

// ComputedPagination
const Pagination = Object.assign(_Pagination, { Item: PaginationItem })

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { PaginationProps } from './pagination/props'
export type { PaginationItemProps } from './pagination-item/props'

export { Pagination }
export default Pagination
