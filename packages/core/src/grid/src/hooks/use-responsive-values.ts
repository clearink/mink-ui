import type { GridAlign, GridJustify } from '../_shared.props'
import type { OmittedRowProps, PickedRowProps } from '../row.props'

import { toArray } from '@mink-ui/shared/array/to-array'
import { isObject } from '@mink-ui/shared/is/is-object'

import { useBreakpoint } from '../../../_shared/hooks/use-breakpoint'
import { matchBreakpoint } from '../utils/helpers'

/**
 * @description 获取响应式数据
 */
export function useResponsiveValues(picked: PickedRowProps, omitted: OmittedRowProps) {
  const { gutter } = picked
  const { align, justify } = omitted

  const matches = useBreakpoint()

  const [hGutter, vGutter] = toArray(gutter).map((item) => {
    if (!isObject(item)) return item

    return matchBreakpoint(matches, item)
  })

  const [hLayout, vLayout] = [justify, align].map((item) => {
    if (!isObject(item)) return item

    return matchBreakpoint(matches, item)
  })

  return {
    hGutter,
    vGutter,
    hLayout: hLayout as GridJustify | undefined,
    vLayout: vLayout as GridAlign | undefined,
  }
}
