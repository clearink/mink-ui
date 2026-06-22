import type { Ref, RefCallback } from 'react'
import type { MayBe, VoidFn } from '@mink-ui/shared/interface'

import { batch } from '@mink-ui/shared/function/batch'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

/**
 * @description 填充 ref
 */
export function fillRef<T>(el: T, ref?: Ref<T>): void | VoidFn {
  if (isNullish(ref)) return

  if (isFunction(ref)) return ref(el)

  ref.current = el

  return () => { ref.current = null }
}

/**
 * @description 转换为 ref 回调函数
 */
export function toRefCallback<T>(ref: MayBe<Ref<T>>): RefCallback<T> | undefined {
  if (isNullish(ref)) return undefined

  if (isFunction(ref)) return (el: T | null) => ref(el)

  return (el: T | null) => {
    ref.current = el

    return () => { ref.current = null }
  }
}

/**
 * @description 组合多个 ref
 */
export function composeRefs<T>(...refs: (MayBe<Ref<T>>)[]) {
  const filtered = refs.filter(Boolean)

  // 如果都是 nullish，则返回 undefined
  if (!filtered.length) return undefined

  return batch(...filtered.map(toRefCallback))
}
