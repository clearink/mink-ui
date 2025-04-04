import type { ReactNode, RefObject } from 'react'

import type { HasChildren, SemanticStyledProps } from '../../_shared/types'
import type { SizeType } from '../../config-provider/_shared.context'
import type { ExpandedName } from '../_shared.props'
import type { CollapseItemProps } from '../collapse-item/props'

export type CollapseItemType = {
  ref?: RefObject<HTMLDivElement>
} & CollapseItemProps

export type CollapsibleType = 'header' | 'icon' | 'title'
export type ExpandIconPosition = 'end' | 'start'
export interface CollapseProps<K extends ExpandedName = ExpandedName>
  extends HasChildren,
  SemanticStyledProps<'root'> {
  accordion?: boolean
  bordered?: boolean
  collapsible?: CollapsibleType
  defaultExpandedNames?: K | K[]
  disabled?: boolean
  expandIcon?: ((props: { expanded: boolean, name: K }) => ReactNode) | ReactNode
  expandIconPosition?: ExpandIconPosition
  expandedNames?: K | K[]
  ghost?: boolean
  items?: CollapseItemType[]

  keepMounted?: boolean
  onChange?: (expandedName: K, ExpandedNames: K[]) => void
  size?: SizeType
  unmountOnExit?: boolean
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultCollapseProps: Partial<CollapseProps> = {
  bordered: true,
  collapsible: 'header',
  expandIconPosition: 'start',
}
