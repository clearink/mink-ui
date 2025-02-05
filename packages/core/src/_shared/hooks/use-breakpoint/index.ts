import { isUndefined } from '@mink-ui/shared'
import { useEffect } from 'react'

import type { ScreenMatch } from './breakpoint'

import { useEvent } from '../use-event'
import { useExactState } from '../use-exact-state'
import observer from './breakpoint-observer'

// 基础响应式断点 hooks
export function useBreakpoint(shouldUpdate?: (query: ScreenMatch<boolean>) => boolean) {
  const [matches, updateMatches] = useExactState(observer.getCurrentMatches)

  const handler = useEvent((query: ScreenMatch<boolean>) => {
    if (isUndefined(shouldUpdate) || shouldUpdate(query)) updateMatches(query)
  })

  useEffect(() => observer.subscribe(handler), [handler])

  return matches
}
