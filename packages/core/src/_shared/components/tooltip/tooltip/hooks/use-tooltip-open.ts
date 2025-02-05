import { useControllableState, useEvent, useWatchValue } from '@mink-ui/core/_shared/hooks'
import { makeTimeout } from '@mink-ui/shared'
import { useEffect, useRef } from 'react'

import type { InternalTooltipProps } from '../props'

export default function useTooltipOpen(props: InternalTooltipProps) {
  const { closeDelay, content, defaultIsOpen, onOpenChange, isOpen: _isOpen, openDelay } = props

  const timer = useRef(() => {})

  useEffect(() => () => { timer.current() }, [])

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultIsOpen && !!content,
    onChange: onOpenChange,
    value: _isOpen && !!content,
  })

  useWatchValue(content, () => { setIsOpen(isOpen && !!content) })

  return [
    isOpen,
    useEvent((action: (state: boolean) => boolean) => {
      timer.current()

      const newIsOpen = action(isOpen) && !!content

      const delay = (newIsOpen ? openDelay : closeDelay) ?? 0

      if (delay === 0) setIsOpen(newIsOpen)
      else timer.current = makeTimeout(delay, () => { setIsOpen(newIsOpen) })
    }),
  ] as const
}
