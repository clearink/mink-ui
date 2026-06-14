import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { DIVIDER_ALIGN } from './_shared.constant'
import type { DividerProps } from './divider.props'

export type DividerAlign = typeof DIVIDER_ALIGN[number]

export type DividerVariant = 'dashed' | 'dotted' | 'solid'

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface DividerGlobalConfig extends GetSemanticsConfig<DividerProps> {}
