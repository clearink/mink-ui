import type { Dispatch, SetStateAction } from 'react'

import { isFunction, shallowEqual } from '@mink-ui/shared'
import { useState } from 'react'

import { useEvent } from '../use-event'

function useExactState<S>(initialState: (() => S) | S): [S, Dispatch<SetStateAction<S>>] {
  const [state, update] = useState(initialState)

  const setState = useEvent((action: SetStateAction<S>) => {
    const next = isFunction(action) ? action(state) : action

    if (!shallowEqual(state, next)) update(next)
  })

  return [state, setState]
}

export { useExactState }
