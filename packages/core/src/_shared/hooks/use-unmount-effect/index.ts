import { useEffect } from 'react'

import { useEvent } from '../use-event'

export function useUnmountEffect(effect: () => void) {
  const callback = useEvent(effect)

  useEffect(() => callback, [callback])
}
