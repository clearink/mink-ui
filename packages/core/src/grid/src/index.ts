import { useBreakpoint } from '../../_shared/hooks/use-breakpoint'
import Col from './col'
import Row from './row'

// CompoundGrid
const Grid = { Col, Row, useBreakpoint }

/**
 * |---------------------------------------------------------|
 * |------------------- export definition -------------------|
 * |---------------------------------------------------------|
 */
export type { ColProps } from './col.props'
export type { RowProps } from './row.props'

export { Col, Grid, Row, useBreakpoint }

export default Grid
