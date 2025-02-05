import { useDeepMemo, useEvent } from '@mink-ui/core/_shared/hooks'
import { batch, getShadowRoot, makeEventListener, ownerWindow, toArray } from '@mink-ui/shared'
import { useEffect, useMemo } from 'react'

import type { InternalTooltipProps } from '../props'
import type { TooltipRefs } from './use-tooltip'

import { formatTriggerEvents, isInPopupChain } from '../utils/helpers'

export interface UseTooltipEventsOptions {
  refs: TooltipRefs
  setIsOpen: (action: (state: boolean) => boolean) => void
  trigger: InternalTooltipProps['trigger']
}

// 触发事件
export default function useTooltipEvents(options: UseTooltipEventsOptions) {
  const { refs, trigger, setIsOpen } = options

  const actions = useDeepMemo(() => new Set(toArray(trigger)), [trigger])

  const clickToHide = actions.has('click') || actions.has('contextMenu')

  const handleHidden = useEvent((event: MouseEvent) => {
    const isInChain = () => isInPopupChain(event, refs)
    setIsOpen(isOpen => !isOpen || isInChain() ? isOpen : false)
  })

  useEffect(() => {
    const element = refs.trigger

    if (!element || !clickToHide) return

    const shadowRoot = getShadowRoot(element)

    const thisWindow = ownerWindow(element)

    return batch(
      makeEventListener(thisWindow, 'mousedown', handleHidden, true),
      makeEventListener(thisWindow, 'contextmenu', handleHidden, true),
      shadowRoot && makeEventListener(shadowRoot, 'mousedown', handleHidden, true),
      shadowRoot && makeEventListener(shadowRoot, 'contextmenu', handleHidden, true),
    )
  }, [refs, clickToHide, handleHidden])

  return useMemo(() => formatTriggerEvents(actions, setIsOpen), [actions, setIsOpen])
}
