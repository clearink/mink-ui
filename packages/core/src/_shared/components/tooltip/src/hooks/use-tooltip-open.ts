import type { SetStateDispatch } from '../../../../types/state-dispatch'
import type { OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'

import { useEffect, useRef } from 'react'
import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { noop } from '@mink-ui/shared/function/noop'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useControlledState } from '../../../../hooks/use-controlled-state'
import { useEvent } from '../../../../hooks/use-event'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { isRenderable } from '../../../../utils/renderable'

export function useTooltipOpen(
  picked: PickedInternalTooltipProps,
  omitted: OmittedInternalTooltipProps,
) {
  const { openDelay, closeDelay } = picked
  const { content, isOpen: _isOpen, defaultIsOpen, onIsOpenChange } = omitted

  const hasContent = isRenderable(content)

  const timer = useRef(noop)

  const [isOpen, setIsOpen] = useControlledState(
    !isUndefined(_isOpen) ? _isOpen && hasContent : _isOpen,
    () => !!(defaultIsOpen && hasContent),
    onIsOpenChange,
  )

  const handleIsOpenChange: SetStateDispatch<boolean> = useEvent((action) => {
    timer.current()

    const newIsOpen = hasContent && action(isOpen)

    const delay = (newIsOpen ? openDelay : closeDelay) ?? 0

    if (delay <= 0) setIsOpen(newIsOpen)
    else timer.current = makeTimeout(delay, () => { setIsOpen(newIsOpen) })
  })

  const hasContentChanged = useWatchValue(
    hasContent,
    (curr) => { setIsOpen(isOpen && curr) },
    (curr, prev) => !isOpen || shallowEqual(curr, prev),
  )

  useEffect(() => () => { timer.current() }, [])

  return { isOpen, hasContentChanged, handleIsOpenChange }
}
