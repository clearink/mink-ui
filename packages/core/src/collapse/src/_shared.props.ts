import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { CollapseProps } from './collapse.props'

export type ExpandedName = number | string

export type CollapsibleType = 'header' | 'icon' | 'title' | 'disabled'

export type ExpandIconPlacement = 'start' | 'end'

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface CollapseGlobalConfig extends GetSemanticsConfig<CollapseProps> {}
