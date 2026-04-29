import type { CSSProperties } from 'react'
import type { AnyObj } from '@mink-ui/shared/interface'
import type { CssAttrsItem, CssNamesItem } from '../../types'

import { isFunction } from '@mink-ui/shared/is/is-function'
import { rawType } from '@mink-ui/shared/object/raw-type'

import { cn } from '../../libs/cn'
import { useComputed } from '../use-computed'

function shouldSemanticItemsUpdate<T extends AnyObj | undefined>(prev: T[], next: T[]) {
  if (prev.length !== next.length) return false

  return prev.every((prevItem, index) => {
    const nextItem = next[index]

    if (rawType(prevItem) !== rawType(nextItem)) return false

    if (!prevItem || !nextItem) return false

    const prevKeys = Object.keys(prevItem)
    const nextKeys = Object.keys(nextItem)

    if (prevKeys.length !== nextKeys.length) return false

    return prevKeys.every(key => prevItem[key] === nextItem[key])
  })
}

/**
 * @description 合并所有的样式
 */
export function useCombinedSemantics<U extends AnyObj, T extends string = string>(
  cssNamesList: (CssNamesItem<T, U> | undefined)[],
  cssAttrsList: (CssAttrsItem<T, U> | undefined)[],
  metaInfo = {} as U,
) {
  const cssNames = useComputed({
    deps: cssNamesList,
    compare: shouldSemanticItemsUpdate,
    factory: () => cssNamesList.reduce<Partial<Record<T, string>>>((result, item) => {
      item && Object.entries(item).forEach(([k, v]) => {
        const values = isFunction(v) ? v(metaInfo) : v

        if (!values) return

        result[k as T] = cn(result[k as T], values)
      })

      return result
    }, {}),
  })

  const cssAttrs = useComputed({
    deps: cssAttrsList,
    compare: shouldSemanticItemsUpdate,
    factory: () => cssAttrsList.reduce<Partial<Record<T, CSSProperties>>>((result, item) => {
      item && Object.entries(item).forEach(([k, v]) => {
        const values = isFunction(v) ? v(metaInfo) : v

        if (!values) return

        result[k as T] = { ...result[k as T], ...values }
      })

      return result
    }, {}),
  })

  return [cssNames, cssAttrs] as const
}
