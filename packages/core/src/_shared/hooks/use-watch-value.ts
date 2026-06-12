import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useConstant } from './use-constant'
import { useForceUpdate } from './use-force-update'
import { useInvoke } from './use-invoke'

export function useWatchValue<S>(
  current: S,
  factory: (current: S, previous: S) => void,
  compare: (current: S, previous: S) => boolean = shallowEqual,
): boolean {
  const forceUpdate = useForceUpdate()

  const store = useConstant(() => ({ previous: current }))

  return useInvoke(() => {
    const hasChanged = !compare(current, store.previous)

    hasChanged && factory(current, store.previous)

    hasChanged && forceUpdate()

    store.previous = current

    return hasChanged
  })
}
