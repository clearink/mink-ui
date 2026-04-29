import type { SegmentedItemProps } from './segmented-item.props'

export type SegmentedValue = string | number

export interface SegmentedOption extends
  Omit<
    SegmentedItemProps,
    | 'checked'
    | 'isShowThumb'
    | 'onChange'
  > {}
