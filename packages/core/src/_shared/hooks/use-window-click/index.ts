import type { ClickListener } from './_shared.props'

import { useEffect } from 'react'

import { useEvent } from '../use-event'
import { clickSubject as subject } from './utils/singleton'

export function useWindowClick(active: boolean, callback: ClickListener) {
  const handler = useEvent(callback)

  useEffect(() => subject.subscribe(), [])

  useEffect(() => subject.activate(active, handler), [active, handler])
}
