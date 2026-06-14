import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { CommonSize } from '../../_shared/types/size'
import type { SPACE_ALIGN } from './_shared.constant'
import type { SpaceProps } from './space.props'

export type SpaceSize = number | CommonSize | undefined

export type SpaceAlign = (typeof SPACE_ALIGN)[number]

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface SpaceGlobalConfig extends GetSemanticsConfig<SpaceProps>,
  Pick<SpaceProps, 'size'> {}
