import type { CSSProperties } from 'react'
import type { AnyObj } from '@mink-ui/shared/interface'
import type { CssAttrsItem, CssNamesItem } from '../../types/styled'

import { isFunction } from '@mink-ui/shared/is/is-function'

import { cn } from '../../libs/cn'

function resolveCssItem<T>(v: T, meta: unknown): T {
  return isFunction(v) ? v(meta) : v as any
}

function composeCssNames(prev: unknown, next: unknown) {
  const prevFn = isFunction(prev) ? prev : () => prev
  const nextFn = isFunction(next) ? next : () => next
  return (...args: any[]) => cn(prevFn(...args), nextFn(...args))
}

function composeCssAttrs(prev: unknown, next: unknown) {
  const prevFn = isFunction(prev) ? prev : () => prev
  const nextFn = isFunction(next) ? next : () => next
  return (...args: any[]) => ({ ...prevFn(...args), ...nextFn(...args) })
}

/**
 * @description 合并所有的样式
 */
export function useCombinedSemantics<U extends AnyObj, T extends string = string, D extends boolean = false>(
  cssNamesList: (CssNamesItem<T, U> | undefined)[],
  cssAttrsList: (CssAttrsItem<T, U> | undefined)[],
  options?: { defer?: D, meta?: U },
) {
  const { defer, meta } = options ?? {}

  const cssNames = cssNamesList.reduce<Partial<Record<T, D extends true ? any : string>>>((result, item) => {
    item && Object.entries(item).forEach(([k, v]) => {
      const values: any = defer ? composeCssNames(result[k as T], v) : resolveCssItem(v, meta)

      if (!values) return

      result[k as T] = defer ? values : cn(result[k as T], values)
    })

    return result
  }, {})

  const cssAttrs = cssAttrsList.reduce<Partial<Record<T, D extends true ? any : CSSProperties>>>((result, item) => {
    item && Object.entries(item).forEach(([k, v]) => {
      const values: any = defer ? composeCssAttrs(result[k as T], v) : resolveCssItem(v, meta)

      if (!values) return

      result[k as T] = defer ? values : { ...result[k as T], ...values }
    })

    return result
  }, {})

  return [cssNames, cssAttrs] as const
}
