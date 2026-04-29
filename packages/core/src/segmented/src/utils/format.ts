import type { SegmentedOption, SegmentedValue } from '../_shared.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isObject } from '@mink-ui/shared/is/is-object'

export function normalizeSegmentedOptions<T extends SegmentedValue>(options: SegmentedOption<T>[]) {
  if (!isArray(options)) return []

  return options.map((item) => {
    if (!isObject(item)) return { label: item, title: `${item}`, value: item }

    const { label, title } = item

    return {
      ...item,
      title: fallback(title, isObject(label) ? undefined : `${label}`),
    }
  }) as SegmentedOption<T>[]
}
