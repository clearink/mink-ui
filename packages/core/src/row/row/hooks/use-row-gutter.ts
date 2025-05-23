import { isArray, isNumber } from '@mink-ui/shared'

import type { RowProps } from '../props'

import { matchBreakpoint, useBreakpoint } from '../../../_shared/hooks'

export default function useRowGutter(gutter: NonNullable<RowProps['gutter']>) {
  const tuple = isArray(gutter) ? gutter : [gutter, 0]

  const matches = useBreakpoint((query) => {
    return tuple.some((gap) => {
      if (isNumber(gap)) return false

      const oldGap = matchBreakpoint(matches, gap)
      const newGap = matchBreakpoint(query, gap)

      return oldGap !== newGap
    })
  })

  return tuple.map((gap) => {
    if (isNumber(gap)) return gap
    return matchBreakpoint(matches, gap) ?? 0
  })
}
