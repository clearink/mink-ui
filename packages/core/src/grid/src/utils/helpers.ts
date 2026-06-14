import type { AnyObj } from '@mink-ui/shared/interface'
import type { ResponsiveGridColLayout } from '../_shared.props'

import { isObject } from '@mink-ui/shared/is/is-object'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { formatGridFlex } from './format'

/**
 * @description 解析响应式栅格布局
 */
export function resolveColBreakpoints(ns: string, breakpoints: ResponsiveGridColLayout) {
  const { xs, sm, md, lg, xl, xxl } = breakpoints

  const result: AnyObj = {}
  const aligns: AnyObj = {}

  const generate = (point: string, item: typeof xs) => {
    if (isUndefined(item)) return

    if (!isObject(item)) {
      return result[`${ns}-${point}--${item}`] = !isUndefined(item)
    }

    result[`${ns}-${point}--${item.span}`] = !isUndefined(item.span)
    result[`${ns}-${point}--offset-${item.offset}`] = !isUndefined(item.offset)
    result[`${ns}-${point}--order-${item.order}`] = !isUndefined(item.order)
    result[`${ns}-${point}--pull-${item.pull}`] = !isUndefined(item.pull)
    result[`${ns}-${point}--push-${item.push}`] = !isUndefined(item.push)
    result[`${ns}-${point}--flex`] = !isUndefined(item.flex)

    const alignment = formatGridFlex(item.flex)

    if (!isUndefined(alignment)) aligns[`--${ns}-${point}--flex`] = alignment
  }

  generate('xs', xs)
  generate('sm', sm)
  generate('md', md)
  generate('lg', lg)
  generate('xl', xl)
  generate('xxl', xxl)

  return [result, aligns] as const
}
