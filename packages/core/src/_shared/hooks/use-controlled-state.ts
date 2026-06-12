import type { SetStateAction } from 'react'

import { useState } from 'react'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useEvent } from './use-event'

export interface ControlledStateOptions<T, Extra extends any[] = []> {
  value?: T
  defaultValue: () => T
  onChange?: (value: T, ...extra: Extra) => any
}

export function useControlledState<T, Extra extends any[] = []>(
  value: T | undefined,
  defaultValue: () => T,
  onChange?: (value: T, ...extra: Extra) => any,
) {
  const isControlled = !isUndefined(value)

  const [internal, setInternal] = useState(() => isControlled ? value : defaultValue())

  const external = isControlled ? value : internal

  const setState = useEvent((action: SetStateAction<T>, ...extra: Extra) => {
    const next = isFunction(action) ? action(external) : action

    if (shallowEqual(external, next)) return

    if (!isControlled) setInternal(() => next)

    onChange?.(next, ...extra)
  })

  return [external, setState, isControlled] as const
}
