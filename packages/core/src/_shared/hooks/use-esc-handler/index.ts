import type { EscHandlerItem } from './_shared.props'

import { useEffect } from 'react'

import { useEvent } from '../use-event'
import { escStack } from './utils/singleton'

export function useEscHandler(active: boolean, handler: EscHandlerItem) {
  const callback = useEvent(handler)

  useEffect(() => escStack.subscribe(), [])

  useEffect(() => escStack.activate(active, callback), [active, callback])
}
