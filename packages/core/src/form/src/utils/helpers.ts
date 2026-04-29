import type { AnyObj } from '@mink-ui/shared/interface'
import type { MetaChangeEvent } from '../_shared.props'

import { arrayEqual } from '@mink-ui/shared/array/array-equal'
import { isFunction } from '@mink-ui/shared/is/is-function'

/**
 * @description 初始化 metaInfo
 */
export function initialMetaInfo(): MetaChangeEvent {
  return {
    name: [],
    touched: false,
    validating: false,
    validated: false,
    warnings: [],
    errors: [],
    mounted: false,
  }
}

/**
 * @description FormItem 更新是否需要 children 更新
 */
export function shouldFormItemChildrenUpdate(prev: AnyObj, next: AnyObj) {
  const prevKeys = Object.keys(prev)
  const nextKeys = Object.keys(next)

  if (prevKeys.length !== nextKeys.length) return true

  return prevKeys.some((key) => {
    // when 跳过，不参与判断
    if (key === 'when') return false

    // 值相等直接通过
    if (prev[key] === next[key]) return false

    // children 必须严格相等, 其他函数类型可跳过
    return key === 'children' || !(isFunction(prev[key]) || isFunction(next[key]))
  })
}

/**
 * @description meatInfo 是否应该更新
 */
export function shouldFormItemMetaInfoUpdate(prev: MetaChangeEvent, next: MetaChangeEvent) {
  return (
    prev.touched !== next.touched
    || prev.validating !== next.validating
    || prev.validated !== next.validated
    || prev.mounted !== next.mounted
    || !arrayEqual(prev.name, next.name)
    || !arrayEqual(prev.warnings, next.warnings)
    || !arrayEqual(prev.errors, next.errors)
  )
}
