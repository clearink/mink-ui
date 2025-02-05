import { shallowUnequal } from '@mink-ui/shared'
import { useMemo } from 'react'

import { useConstant } from '../use-constant'

export function usePrevious<T>(value: T) {
  const state = useConstant(() => ({
    current: undefined as T | undefined,
    previous: undefined as T | undefined,
  }))

  return useMemo(() => {
    if (shallowUnequal(state.current, value)) {
      state.previous = state.current

      state.current = value
    }

    return state.previous
  }, [state, value])
}
