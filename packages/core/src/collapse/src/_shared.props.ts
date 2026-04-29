import type { CollapseItemProps } from './collapse-item.props'

export type ExpandedName = number | string

export type CollapsibleType = 'header' | 'icon' | 'title' | 'disabled'

export type ExpandIconPlacement = 'start' | 'end'

export interface CollapseItemType extends
  Omit<
    CollapseItemProps,
    | 'accordion'
    | 'expanded'
    | 'rootCssNames'
    | 'rootCssAttrs'
    | 'rootNamespace'
    | 'onChange'
  > {}
