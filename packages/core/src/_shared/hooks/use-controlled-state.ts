import type { SetStateAction } from 'react'

import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowUnequal } from '@mink-ui/shared/object/shallow-unequal'

import { useEvent } from './use-event'
import { useExactState } from './use-exact-state'

export interface ControllableStateOptions<T, Extra extends any[] = []> {
  value?: T
  defaultValue?: T | (() => T)
  onChange?: (value: T, ...extra: Extra) => any
  shouldUpdate?: (prev: T, next: T) => boolean
}

export function useControlledState<T, Extra extends any[] = []>(options: ControllableStateOptions<T, Extra>) {
  const { defaultValue, onChange, shouldUpdate = shallowUnequal, value } = options

  const controlled = !isUndefined(value)

  const [internal, setInternal] = useExactState(controlled ? value : defaultValue)

  const external = controlled ? value : internal as T

  const setState = useEvent((state: SetStateAction<T>, ...extra: Extra) => {
    const next = isFunction(state) ? state(external) : state

    if (!shouldUpdate(external, next)) return

    if (!controlled) setInternal(next)

    onChange && onChange(next, ...extra)
  })

  return [external, setState, controlled] as [T, (state: SetStateAction<T>, ...extra: Extra) => void, boolean]
}
