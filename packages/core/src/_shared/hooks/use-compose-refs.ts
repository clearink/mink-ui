import type { ReactElement, Ref } from 'react'
import type { MayBe } from '@mink-ui/shared/interface'

import { arrayEqual } from '@mink-ui/shared/array/array-equal'

import { composeRefs } from '../utils/refs'
import { useComputed } from './use-computed'

export function useComposeRefs<E>(...refs: MayBe<Ref<E>>[]) {
  return useComputed(() => composeRefs<E>(...refs), refs, arrayEqual)
}

export function getElementRef(el: MayBe<ReactElement<any>>): Ref<any> | undefined {
  if (!el) return undefined

  return el.props?.ref ?? (el as any).ref
}
