import type { GlobalConfig } from '../_shared.props'

import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

/**
 * @description GlobalConfig 是否相等
 */
export function isGlobalConfigEqual(prev: GlobalConfig, next: GlobalConfig) {
  const prevKeys = Object.keys(prev) as (keyof GlobalConfig)[]
  const nextKeys = Object.keys(next)

  if (prevKeys.length !== nextKeys.length) return false

  return prevKeys.every(key => shallowEqual(prev[key], next[key]))
}
