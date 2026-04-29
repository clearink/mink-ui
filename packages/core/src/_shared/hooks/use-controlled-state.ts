import type { Dispatch, SetStateAction } from 'react'

import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowUnequal } from '@mink-ui/shared/object/shallow-unequal'

import { useEvent } from './use-event'
import { useExactState } from './use-exact-state'

export function validateControlled<T>(prop: T | undefined, state: T) {
  const controlled = !isUndefined(prop)

  return [controlled ? prop : state, controlled] as const
}

export interface ControllableStateOptions<T> {
  defaultValue?: (() => T) | T
  onChange?: (value: T) => any
  shouldUpdate?: (prev: T, next: T) => boolean
  value?: T
}

export function useControlledState<T>(options: ControllableStateOptions<T>) {
  const { defaultValue, onChange, shouldUpdate = shallowUnequal, value } = options

  const [internal, setInternal] = useExactState(defaultValue as T)

  const [external, controlled] = validateControlled(value, internal)

  const setState = useEvent((state: SetStateAction<T>) => {
    const next = isFunction(state) ? state(external) : state

    if (!shouldUpdate(external, next)) return

    if (!controlled) setInternal(next)

    onChange && onChange(next)
  })

  return [external, setState, controlled] as [T, Dispatch<SetStateAction<T>>, boolean]
}
