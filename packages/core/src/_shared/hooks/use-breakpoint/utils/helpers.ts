import type { Breakpoint, ScreenMatch } from '../_shared.props'

import { isObject } from '@mink-ui/shared/is/is-object'
import { hasOwn } from '@mink-ui/shared/object/has-own'

import { BREAKPOINT_NAME } from '../_shared.constant'

/**
 * @description 断点值需要更新
 */
export function shouldScreenMatchUpdate(prev: ScreenMatch, next: ScreenMatch) {
  const keys = Object.keys(prev) as unknown as Breakpoint[]

  return keys.some(key => prev[key] !== next[key])
}

/**
 * @description 匹配相应的断点数据
 */
export function matchBreakpoint<T>(matches: ScreenMatch, target: ScreenMatch<T>) {
  for (let i = BREAKPOINT_NAME.length - 1; i >= 0; i--) {
    const point = BREAKPOINT_NAME[i]

    const matched = matches[point]

    // 没有该断点配置 || target 也没有
    if (!matched || !hasOwn(target, point)) continue

    return target[point]
  }

  // 找不到不应更新数据
  return undefined
}

/**
 * @description 解析响应式数据值
 */
export function resolveBreakpointValue<T>(
  matches: ScreenMatch,
  values: T | ScreenMatch<T> | undefined,
) {
  if (!isObject(values)) return values

  return matchBreakpoint<T>(matches, values)
}
