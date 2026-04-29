import type { CssTransitionProps } from '../css-transition.props'

import { ownerComputedStyle } from '@mink-ui/shared/dom/global'

/**
 * @description: 格式化过渡动画时间信息
 */
function formatTimeoutInfo(declaration: CSSStyleDeclaration, type: CssTransitionProps['type']) {
  const ms = (s: string) => (Number.parseFloat(s) || 0) * 1e3

  const values = (key: keyof CSSStyleDeclaration): string[] => `${declaration[key] || ''}`.split(', ')

  const delays = values(`${type!}Delay`)

  const durations = values(`${type!}Duration`)

  const timeouts = durations.map((d, i) => ms(d) + ms(delays[i % delays.length]))

  return { count: durations.length, timeout: Math.max.apply(null, timeouts) }
}

/**
 * @description: 格式化过渡信息
 */
export function formatTransitionInfo(el: HTMLElement) {
  const declaration = ownerComputedStyle(el)

  return {
    transition: formatTimeoutInfo(declaration, 'transition'),
    animation: formatTimeoutInfo(declaration, 'animation'),
  }
}
