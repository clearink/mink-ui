import type { Ref, RefCallback } from 'react'
import type { MayBe, VoidFn } from '@mink-ui/shared/interface'

import { batch } from '@mink-ui/shared/function/batch'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

export function fillRef<T>(el: T, ref?: Ref<T>): void | VoidFn {
  if (isNullish(ref)) return

  if (isFunction(ref)) return ref(el)

  ref.current = el

  return () => { ref.current = null }
}

export function combineRefs<T>(...refs: (MayBe<Ref<T>>)[]): RefCallback<T> | undefined {
  const filtered = refs.filter(ref => !isNullish(ref))

  // 如果都是 nullish，则返回 undefined
  if (!filtered.length) return undefined

  return batch(...filtered.map(ref => (el: T | null) => fillRef(el, ref)))
}
