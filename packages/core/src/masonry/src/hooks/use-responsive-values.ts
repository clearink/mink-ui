import type { PickedMasonryProps } from '../masonry.props'

import { useMemo } from 'react'

import { useBreakpoint } from '../../../_shared/hooks/use-breakpoint'
import { resolveMasonryColumns, resolveMasonryGutter } from '../utils/helpers'

export function useResponsiveValues<T>(picked: PickedMasonryProps<T>) {
  const { gutter, columns } = picked

  const matches = useBreakpoint()

  const cols = useMemo(() => resolveMasonryColumns(matches, columns), [matches, columns])

  const { hGutter, vGutter } = useMemo(() => resolveMasonryGutter(matches, gutter), [matches, gutter])

  return {
    cols,
    hGutter,
    vGutter,
  }
}
