import { useEffect } from 'react'

import { useConstant } from '../use-constant'
import { useExactState } from '../use-exact-state'
import { shouldScreenMatchUpdate } from './utils/helpers'
import observer from './utils/observer'

export function useBreakpoint() {
  useConstant(() => observer.initial())

  const [matches, update] = useExactState(() => observer.current)

  useEffect(() => observer.subscribe((next) => {
    update(prev => shouldScreenMatchUpdate(prev, next) ? next : prev)
  }), [update])

  return matches
}
