import type { CommonSize } from '../../../_shared/types'

import { hasOwn } from '@mink-ui/shared/object/has-own'

import { SIZE_ENUM } from '../_shared.constant'

/**
 * @description 是否为预先定义好的 size
 */
export function isBuiltinSize(value: any): value is CommonSize {
  return hasOwn(SIZE_ENUM, value)
}
