import type { AnyObj } from '../interface'

import { rawType } from '../object/raw-type'

export function isPlainObject(obj: any): obj is AnyObj {
  return rawType(obj) === 'Object'
}
