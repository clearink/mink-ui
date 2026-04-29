import type { ReactElement, ReactNode, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'

import { isFragment, isMemo } from 'react-is'
import { Component, isValidElement } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

export function fillRef<T>(el: T, ref?: Ref<T>): void | VoidFn {
  if (isNullish(ref)) return

  if (isFunction(ref)) return ref(el)

  ref.current = el

  return () => { ref.current = null }
}

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  const filtered = refs.filter(ref => !isNullish(ref))

  // 如果都是 nullish，则返回 undefined
  if (!filtered.length) return undefined

  return batch(...filtered.map(ref => (el: T | null) => fillRef(el, ref)))
}

export function supportRef(el: ReactNode): el is { ref: Ref<any> } & ReactElement {
  if (isFragment(el) || !isValidElement(el)) return false

  const type = isMemo(el) ? el.type.type : el.type

  if (isFunction(type) && !(type instanceof Component)) return false

  return true
}
