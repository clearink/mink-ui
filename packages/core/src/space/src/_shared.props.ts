import type { CommonSize } from '../../_shared/types'
import type { SPACE_ALIGN } from './_shared.constant'

export type SpaceSize = number | CommonSize | undefined

export type SpaceAlign = (typeof SPACE_ALIGN)[number]
