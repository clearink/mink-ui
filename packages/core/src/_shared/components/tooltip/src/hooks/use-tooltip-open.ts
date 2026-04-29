import type { IsOpenChangeEvent } from '../_shared.props'
import type { OmittedInternalTooltipProps, PickedInternalTooltipProps } from '../tooltip.props'

import { useEffect, useRef } from 'react'
import { makeTimeout } from '@mink-ui/shared/dom/timer'

import { useControlledState } from '../../../../hooks/use-controlled-state'
import { useEvent } from '../../../../hooks/use-event'
import { useWatchValue } from '../../../../hooks/use-watch-value'

export function useTooltipOpen(
  picked: PickedInternalTooltipProps,
  omitted: OmittedInternalTooltipProps,
) {
  const { openDelay, closeDelay } = picked
  const { content, isOpen: _isOpen, defaultIsOpen, onOpenChange } = omitted

  const timer = useRef(() => {})

  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: defaultIsOpen,
    onChange: onOpenChange,
    value: _isOpen && !!content,
  })

  const hasContentChanged = useWatchValue(content, () => { setIsOpen(isOpen && !!content) })

  const isOpenChange = useEvent((action: IsOpenChangeEvent) => {
    timer.current()

    const newIsOpen = action(isOpen) && !!content

    const delay = (newIsOpen ? openDelay : closeDelay) ?? 0

    if (delay === 0) setIsOpen(newIsOpen)
    else timer.current = makeTimeout(delay, () => { setIsOpen(newIsOpen) })
  })

  useEffect(() => () => { timer.current() }, [])

  return { isOpen, hasContentChanged, isOpenChange }
}
