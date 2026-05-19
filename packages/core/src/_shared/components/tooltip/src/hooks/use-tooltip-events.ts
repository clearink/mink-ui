import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { PickedInternalTooltipProps } from '../tooltip.props'
import type { TooltipControl } from '../utils/tooltip-control'

import { useEffect, useMemo } from 'react'
import { arrayEqual } from '@mink-ui/shared/array/array-equal'
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
  handleChange: SetStateDispatch<boolean>,
) {
  const actions = useComputed(() => new Set(toArray(trigger)), toArray(trigger), arrayEqual)

  const clickToHide = actions.has('click') || actions.has('contextMenu')

  const events = useMemo(() => formatTriggerEvents(actions, handleChange), [actions, handleChange])

  useEffect(() => {
    const element = control.trigger

    if (!element || !clickToHide) return

    const shadowRoot = getShadowRoot(element)

    const thisWindow = ownerWindow(element)

    const handler = (event: MouseEvent) => {
      const isInChain = () => control.inChain(event)
      handleChange(isOpen => !isOpen || isInChain() ? isOpen : false)
    }

    return batch(
      makeEventListener([thisWindow, shadowRoot], 'mousedown', handler, true),
      makeEventListener([thisWindow, shadowRoot], 'contextmenu', handler, true),
    )
  }, [control, clickToHide, handleChange])

  return events
}
