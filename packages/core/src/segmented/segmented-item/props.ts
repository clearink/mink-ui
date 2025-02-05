import type { SegmentedOption } from '../segmented/props'

export interface SegmentedItemProps extends SegmentedOption {
  checked: boolean
  onChange: (value: SegmentedOption['value']) => void
  showThumb: boolean
  title?: string
}
