import type { GridAlign, GridJustify, GutterValue } from '../_shared.props'
import type { OmittedRowProps, PickedRowProps } from '../row.props'

import { useMemo } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'

import { useBreakpoint } from '../../../_shared/hooks/use-breakpoint'
import { resolveBreakpointValue } from '../../../_shared/hooks/use-breakpoint/utils/helpers'

/**
 * @description 获取响应式数据
 */
export function useResponsiveValues(picked: PickedRowProps, omitted: OmittedRowProps) {
  const { gutter } = picked
  const { align, justify } = omitted

  const matches = useBreakpoint()

  const [hGutter, vGutter] = useMemo(
    () => toArray(gutter).map(item => resolveBreakpointValue<GutterValue>(matches, item)),
    [matches, gutter],
  )

  const hLayout = useMemo(() => resolveBreakpointValue<GridJustify>(matches, justify), [matches, justify])

  const vLayout = useMemo(() => resolveBreakpointValue<GridAlign>(matches, align), [matches, align])

  return { hGutter, vGutter, hLayout, vLayout }
}
