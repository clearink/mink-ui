import { useEffect, useState } from 'react'

import { useConstant } from '../use-constant'
import { shouldScreenMatchUpdate } from './utils/helpers'
import { breakpointMonitor as monitor } from './utils/singleton'

export function useBreakpoint() {
  useConstant(() => monitor.initial())

  const [matches, update] = useState(() => monitor.current)

  useEffect(() => monitor.subscribe((next) => {
    update(prev => shouldScreenMatchUpdate(prev, next) ? next : prev)
  }), [])

  return matches
}
