import { fallback } from '@mink-ui/shared'

import type { SegmentedOption, SegmentedProps, SegmentedType } from '../props'

import { useControllableState } from '../../../_shared/hooks'

export default function useSegmentedValue<T extends SegmentedType = SegmentedType>(
  props: SegmentedProps<T>,
  options: SegmentedOption<T>[],
) {
  const { defaultValue, onChange, value } = props

  return useControllableState({
    defaultValue: fallback(defaultValue, options[0]?.value),
    onChange,
    value,
  })
}
