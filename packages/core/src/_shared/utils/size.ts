import type { CommonSize } from '../types/size'

import { hasOwn } from '@mink-ui/shared/object/has-own'

import { SIZE_ENUM } from '../types/size'

/**
 * @description 是否为预先定义好的 size
 */
export function isBuiltinSize(value: any): value is CommonSize {
  return hasOwn(SIZE_ENUM, value)
}
