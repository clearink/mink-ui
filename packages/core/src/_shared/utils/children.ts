import type { ReactNode } from 'react'
import type { AnyObj, MayBe } from '@mink-ui/shared/interface'

import { isFragment } from 'react-is'
import { Children, cloneElement, isValidElement } from 'react'
import { pushItem } from '@mink-ui/shared/array/push-item'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

export interface FlattenChildrenOptions {
  keepNullish?: boolean
}

/**
 * @description 拍平子元素，可去除 fragment, null, undefined
 */
export function flattenChildren(children: ReactNode, options?: FlattenChildrenOptions) {
  const result: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (isNullish(child) && !options?.keepNullish) return

    if (isArray(child)) return pushItem(result, flattenChildren(child, options))

    if (!isFragment(child) || !child.props) return pushItem(result, child)

    pushItem(result, flattenChildren((child.props as any).children, options))
  })

  return result
}

export interface CustomCloneElementOptions {
  /**
   * @description 子元素不是 validElement 时，返回的 fallback
   */
  fallback?: ReactNode

  /**
   * @description clone 时对子元素 props 的处理
   */
  transform?: (params: AnyObj) => MayBe<AnyObj>
}

/**
 * @description 克隆子元素，并可自定义子元素的 props
 */
export function cloneElementWithOptions(
  element: ReactNode,
  options?: CustomCloneElementOptions,
) {
  const { fallback, transform } = options || {}

  if (!isValidElement(element)) return fallback

  return cloneElement(element, transform?.(element.props!) || undefined)
}
