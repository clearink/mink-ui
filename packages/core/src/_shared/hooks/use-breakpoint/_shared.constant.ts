import type { Breakpoint } from './_shared.props'

/**
 * @description 断点
 */
export const BREAKPOINT_NAME = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

/**
 * @description 断点初始匹配值
 */
export const INIT_MATCHES = BREAKPOINT_NAME.reduce((result, name) => {
  result[name] = true
  return result
}, {} as Record<Breakpoint, boolean>)

/**
 * @description 快速查找对应断点
 */
export const MEDIA_QUERY = new Map([
  ['(max-width: 575px)', 'xs'],
  ['(min-width: 576px)', 'sm'],
  ['(min-width: 768px)', 'md'],
  ['(min-width: 992px)', 'lg'],
  ['(min-width: 1200px)', 'xl'],
  ['(min-width: 1600px)', 'xxl'],
])
