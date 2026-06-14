import type { AnyObj } from '@mink-ui/shared/interface'
import type { ModalFooterContextState } from '../_shared.context'
import type { ModalProps } from '../modal.props'

import { isNumber } from '@mink-ui/shared/is/is-number'
import { isObject } from '@mink-ui/shared/is/is-object'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

/**
 * @description 判断 ModalFooterContextState 是否相等
 */
export function isModalFooterContextValueEqual(prev: ModalFooterContextState, next: ModalFooterContextState) {
  const keys = Object.keys(prev) as (keyof ModalFooterContextState)[]

  return keys.every(key => shallowEqual(prev[key], next[key]))
}

/**
 * @description 解析 Modal 的宽度
 */
export function resolveModalWidthBreakpoints(ns: string, width: ModalProps['width']) {
  if (isUndefined(width)) return undefined

  if (!isObject(width)) return { width }

  const result: AnyObj = {}

  const generate = (point: string, item: typeof width.xs) => {
    if (isUndefined(item)) return

    result[`--${ns}-${point}-width`] = isNumber(item) ? `${item}px` : `${item}`
  }

  generate('xs', width.xs)
  generate('sm', width.sm)
  generate('md', width.md)
  generate('lg', width.lg)
  generate('xl', width.xl)
  generate('xxl', width.xxl)

  return result
}
