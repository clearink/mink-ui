import type { CssTransitionProps } from '../css-transition.props'

import { ownerStyle } from '@mink-ui/shared/dom/global'

/**
 * @description: 格式化过渡动画时间信息
 */
function formatTimeoutInfo<T extends CSSStyleDeclaration>(style: T, type: CssTransitionProps['type']) {
  const ms = (s: string) => (Number.parseFloat(s) || 0) * 1e3

  const values = (key: keyof T) => `${style[key] || ''}`.split(', ').filter(Boolean)

  const delays = values(`${type!}Delay` as keyof T)

  const durations = values(`${type!}Duration` as keyof T)

  const properties = values(`${type!}Property` as keyof T)

  const count = properties.includes('all') ? Infinity : durations.length

  const timeouts = durations.map((d, i) => ms(d) + ms(delays[i % delays.length]))

  return { count, timeout: Math.max.apply(null, timeouts) }
}

/**
 * @description: 格式化过渡信息
 */
export function formatTransitionInfo(el: HTMLElement) {
  const declaration = ownerStyle(el)

  return {
    transition: formatTimeoutInfo(declaration, 'transition'),
    animation: formatTimeoutInfo(declaration, 'animation'),
  }
}
