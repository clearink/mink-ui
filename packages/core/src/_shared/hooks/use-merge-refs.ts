import type { Ref } from 'react'

import isEqual from 'react-fast-compare'

import { mergeRefs } from '../utils/refs'
import { useComputed } from './use-computed'

export function useMergeRefs<T extends Ref<T>>(...refs: T[]) {
  return useComputed({
    deps: refs,
    compare: isEqual,
    factory: () => mergeRefs(...refs),
  })
}
