import type { ScreenMatch } from '../../../_shared/hooks/use-breakpoint/_shared.props'

import { hasOwn } from '@mink-ui/shared/object/has-own'

import { BREAKPOINT_NAME } from '../../../_shared/hooks/use-breakpoint/_shared.constant'

/**
 * @description 匹配相应的断点数据
 */
export function matchBreakpoint<T>(matches: ScreenMatch, target: ScreenMatch<T>) {
  for (let i = 0; i < BREAKPOINT_NAME.length; i++) {
    const point = BREAKPOINT_NAME[i]

    const matched = matches[point]

    // 没有该断点配置 || target 也没有
    if (!matched || !hasOwn(target, point)) continue

    return target[point]
  }

  // 找不到不应更新数据
  return undefined
}
