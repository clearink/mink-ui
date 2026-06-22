import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'
import type { TooltipControl } from '../utils/tooltip-control'

import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useControlledState } from '../../../../hooks/use-controlled-state'
import { useEvent } from '../../../../hooks/use-event'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { isRenderable } from '../../../../utils/renderable'

export function useTooltipIsOpen(
  ctrl: TooltipControl,
  picked: PickedInternalTooltipProps,
  omitted: OmittedInternalTooltipProps,
) {
  const { openDelay, closeDelay } = picked
  const { content, isOpen: _isOpen, defaultIsOpen, onIsOpenChange } = omitted

  const hasContent = isRenderable(content)

  const [isOpen, setIsOpen] = useControlledState(
    !isUndefined(_isOpen) ? _isOpen && hasContent : _isOpen,
    () => !!(defaultIsOpen && hasContent),
    onIsOpenChange,
  )

  const handleIsOpenChange: SetStateDispatch<boolean> = useEvent((action) => {
    ctrl.dispose()

    const newIsOpen = hasContent && action(isOpen)

    const delay = (newIsOpen ? openDelay : closeDelay) ?? 0

    if (newIsOpen === isOpen) return

    if (delay <= 0) setIsOpen(newIsOpen)
    else ctrl.setCleanup(makeTimeout(delay, () => { setIsOpen(newIsOpen) }))
  })

  const hasContentChanged = useWatchValue(
    hasContent,
    (curr) => { setIsOpen(isOpen && curr) },
    (curr, prev) => !isOpen || shallowEqual(curr, prev),
  )

  return {
    isOpen,
    hasContentChanged,
    handleIsOpenChange,
  }
}
