import { useConstant } from './use-constant'
import { useInvoke } from './use-invoke'

export interface ComputedOptions<T, U> {
  factory: () => T
  compare: (prev: U, next: U) => boolean
  deps: U
}

export function useComputed<T, U>(options: ComputedOptions<T, U>) {
  const { factory, compare, deps } = options

  const state = useConstant(() => ({ deps, value: factory() }))

  return useInvoke(() => {
    if (!compare(state.deps, deps)) {
      state.deps = deps

      state.value = factory()
    }

    return state.value
  })
}
