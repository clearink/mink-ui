import { useControllableState } from '@mink-ui/core/_shared/hooks'
import { fallback } from '@mink-ui/shared'

import type { SegmentedOption, SegmentedProps, SegmentedType } from '../props'

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
