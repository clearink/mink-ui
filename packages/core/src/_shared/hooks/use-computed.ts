import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useConstant } from './use-constant'
import { useInvoke } from './use-invoke'

export function useComputed<T, U>(
  factory: () => T,
  deps: U,
  compare: (prev: U, next: U) => boolean = shallowEqual,
) {
  const state = useConstant(() => ({ deps, value: factory() }))

  return useInvoke(() => {
    const hasChanged = !compare(state.deps, deps)

    if (hasChanged) state.deps = deps

    if (hasChanged) state.value = factory()

    return state.value
  })
}
