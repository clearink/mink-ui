import type { IsOpenChangeHandler } from '../_shared.props'
import type { PickedInternalTooltipProps } from '../tooltip.props'
import type { TooltipControl } from '../utils/tooltip-control'

import isEqual from 'react-fast-compare'
import { useEffect, useMemo } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { getShadowRoot } from '@mink-ui/shared/dom/shadow'
import { batch } from '@mink-ui/shared/function/batch'

import { useComputed } from '../../../../hooks/use-computed'
import { formatTriggerEvents } from '../utils/format'

export function useTooltipEvents(
  { trigger }: PickedInternalTooltipProps,
  control: TooltipControl,
  isOpenChange: IsOpenChangeHandler,
) {
  const actions = useComputed({
    deps: toArray(trigger),
    compare: isEqual,
    factory: () => new Set(toArray(trigger)),
  })

  const clickToHide = actions.has('click') || actions.has('contextMenu')

  useEffect(() => {
    const element = control.trigger

    if (!element || !clickToHide) return

    const shadowRoot = getShadowRoot(element)

    const thisWindow = ownerWindow(element)

    const handler = (event: MouseEvent) => {
      const isInChain = () => control.inChain(event)
      isOpenChange(isOpen => !isOpen || isInChain() ? isOpen : false)
    }

    return batch(
      makeEventListener([thisWindow, shadowRoot], 'mousedown', handler, true),
      makeEventListener([thisWindow, shadowRoot], 'contextmenu', handler, true),
    )
  }, [control, clickToHide, isOpenChange])

  return useMemo(() => formatTriggerEvents(actions, isOpenChange), [actions, isOpenChange])
}
