import type { Dispatch, SetStateAction } from 'react'

import { isFunction, isUndefined, shallowUnequal } from '@mink-ui/shared'

import { useEvent } from '../use-event'
import { useExactState } from '../use-exact-state'

export function useControllableProp<T>(prop: T | undefined, state: T) {
  const controlled = !isUndefined(prop)

  return [controlled ? prop : state, controlled] as const
}

export interface ControllableStateProps<T> {
  defaultValue?: (() => T) | T
  onChange?: (value: T) => any
  shouldUpdate?: (prev: T, next: T) => boolean
  value?: T
}

export function useControllableState<T>(props: ControllableStateProps<T>) {
  const { defaultValue, onChange, shouldUpdate = shallowUnequal, value } = props

  const [internal, setInternal] = useExactState(defaultValue as T)

  const [external, controlled] = useControllableProp(value, internal)

  const setState = useEvent((state: SetStateAction<T>) => {
    const next = isFunction(state) ? state(external) : state

    if (!shouldUpdate(external, next)) return

    if (!controlled) setInternal(next)

    onChange && onChange(next)
  })

  return [external, setState, controlled] as [T, Dispatch<SetStateAction<T>>, boolean]
}
