import type { SetStateAction } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'

import { useState } from 'react'
import { noop } from '@mink-ui/shared/function/noop'
import { once } from '@mink-ui/shared/function/once'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useConstant } from './use-constant'
import { useEvent } from './use-event'
import { useIsomorphicEffect } from './use-isomorphic-effect'

export function useCommitState<S>(initialState: (() => S) | S) {
  const store = useConstant(() => ({ fn: noop }))

  const [internal, setInternal] = useState(initialState)

  const setState = useEvent((action: SetStateAction<S>, callback?: VoidFn) => {
    const next = isFunction(action) ? action(internal) : action

    if (shallowEqual(internal, next)) return callback?.()

    store.fn = callback ? once(() => { callback() }) : noop

    setInternal(() => next)
  })

  useIsomorphicEffect(() => { store.fn() }, [internal, store])

  return [internal, setState] as const
}
