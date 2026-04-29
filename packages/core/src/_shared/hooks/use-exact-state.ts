import type { SetStateAction } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'

import { useLayoutEffect, useState } from 'react'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useConstant } from './use-constant'
import { useEvent } from './use-event'

export function useExactState<S>(initialState: (() => S) | S) {
  const store = useConstant(() => ({ fn: null as VoidFn | null }))

  const [internal, setInternal] = useState(initialState)

  const setState = useEvent((action: SetStateAction<S>, callback?: VoidFn) => {
    const next = isFunction(action) ? action(internal) : action

    if (shallowEqual(internal, next)) return callback?.()

    store.fn = callback || null

    setInternal(() => next)
  })

  useLayoutEffect(() => { store.fn?.(); store.fn = null }, [internal, store])

  return [internal, setState] as const
}
