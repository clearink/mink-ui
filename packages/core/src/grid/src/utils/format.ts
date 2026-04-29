import type { GridFlex, GutterValue } from '../_shared.props'

import { isNumber } from '@mink-ui/shared/is/is-number'

import { COL_FLEX_REG } from '../_shared.constant'

/**
 * @description 格式化 flex
 */
export function formatGridFlex(flex: GridFlex | undefined) {
  if (flex === 'auto') return '1 1 auto'

  if (Number.isNaN(flex)) return flex

  if (isNumber(flex)) return `${flex} ${flex} auto`

  if (flex && COL_FLEX_REG.test(flex)) return `0 0 ${flex}`

  return flex
}

/**
 * @description 格式化 gutter
 */
export function formatGridGutter(gutter: GutterValue | undefined, ratio: number) {
  if (!gutter) return undefined

  return isNumber(gutter) ? `${gutter / ratio}px` : `calc(${gutter} / ${ratio})`
}
