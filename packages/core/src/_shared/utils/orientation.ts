import type { Orientation } from '../types/orientation'

import { hasOwn } from '@mink-ui/shared/object/has-own'

import { ORIENTATION_ENUM } from '../types/orientation'

/**
 * @description 是否为预先定义好的 orientation
 */
export function isBuiltinOrientation(value: any): value is Orientation {
  return hasOwn(ORIENTATION_ENUM, value)
}

/**
 * @description 标准化 orientation
 */
export function normalizeOrientation(
  orientation: Orientation | undefined,
  vertical?: boolean,
): Orientation {
  if (isBuiltinOrientation(orientation)) return orientation

  return vertical ? 'vertical' : 'horizontal'
}
