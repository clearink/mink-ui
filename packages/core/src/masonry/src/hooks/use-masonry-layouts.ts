import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { OmittedMasonryProps, PickedMasonryProps } from '../masonry.props'

import { useEffect, useMemo, useState } from 'react'
import { noop } from '@mink-ui/shared/function/noop'
import { once } from '@mink-ui/shared/function/once'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useInvoke } from '../../../_shared/hooks/use-invoke'
import { useIsomorphicEffect } from '../../../_shared/hooks/use-isomorphic-effect'
import { useResizeObserver } from '../../../_shared/hooks/use-observer'
import { useDebounceFrame } from '../../../_shared/hooks/use-scheduler'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { isItemLayoutsEqual, resolveMasonryLayouts } from '../utils/helpers'
import { MasonryControl } from '../utils/masonry-control'
import { useResponsiveValues } from './use-responsive-values'

export function useMasonryLayouts<V>(
  picked: PickedMasonryProps<V>,
  omitted: OmittedMasonryProps<V>,
) {
  const { items } = picked
  const { onLayoutChange } = omitted

  const [commitLayout, setCommitLayout] = useState(() => noop)

  const [sizes, setSizes] = useState(() => new Map<UniqueKey, number>())

  const ctrl = useConstant(() => new MasonryControl())

  useInvoke(() => { ctrl._bind((updater) => { setSizes(updater) }) })

  const { cols, hGutter, vGutter } = useResponsiveValues(picked)

  const { rootCssVars, itemCssVars, itemLayouts } = useMemo(
    () => resolveMasonryLayouts(items!, sizes, cols, hGutter, vGutter),
    [items, sizes, cols, hGutter, vGutter],
  )

  const handleReLayout = useDebounceFrame(() => { ctrl.trigger() })

  const hasLayoutChanged = useWatchValue(
    itemLayouts,
    (curr) => { setCommitLayout(() => once(() => { onLayoutChange?.(curr) })) },
    (curr, prev) => !onLayoutChange || isItemLayoutsEqual(curr, prev),
  )

  useResizeObserver(ctrl.$root, true, handleReLayout)

  useIsomorphicEffect(() => { ctrl.measure(items!) }, [items, ctrl])

  useEffect(() => { commitLayout() }, [commitLayout])

  return {
    ctrl,
    cols,
    hGutter,
    rootCssVars,
    itemCssVars,
    hasLayoutChanged,
    handleReLayout,
  }
}
