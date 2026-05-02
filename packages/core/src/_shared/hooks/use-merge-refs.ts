import type { Ref } from 'react'
import type { MayBe } from '@mink-ui/shared/interface'

import { arrayEqual } from '@mink-ui/shared/array/array-equal'

import { mergeRefs } from '../utils/refs'
import { useComputed } from './use-computed'

export function useMergeRefs<E>(...refs: MayBe<Ref<E>>[]) {
  return useComputed(() => mergeRefs<E>(...refs), refs, arrayEqual)
}
