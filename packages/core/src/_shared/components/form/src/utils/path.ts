import type { ExternalFieldName, InternalFieldName } from '../_shared.props'

import { toArray } from '@mink-ui/shared/array/to-array'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { rawType } from '@mink-ui/shared/object/raw-type'

function _getIn(source: any, path: InternalFieldName) {
  let idx = 0

  const len = path.length

  if (len <= 0) return [undefined, idx === len]

  for (; idx < len && !isNullish(source);) {
    source = source[path[idx++]]
  }

  return [source, idx === len]
}

/**
 * @description 生成路径对应的唯一 id (添加 index 防止重复)
 */
export function _getId(path: ExternalFieldName) {
  return toArray(path).reduce<string>((res, str, i) => {
    return `${res}${i > 0 ? '.' : ''}${str}[${rawType(str)}]#{${i}}`
  }, '')
}

/**
 * @description 获取对应路径的值
 */
export function getIn(source: any, path: InternalFieldName) {
  const [result, matched] = _getIn(source, path)

  return matched ? result : undefined
}

/**
 * @description 判断 copied 中是否存在对应的路径 (不需要全部存在)
 * @param {any} copied
 * @param {any[]} path
 * @param {boolean=} exist 是否只判断已存在的路径
 */
export function hasIn(copied: any, path: InternalFieldName, exist = false) {
  if (exist) return !isUndefined(getIn(copied, path))

  return !isUndefined(_getIn(copied, path)[0])
}

/**
 * @description 两个路径是否有关系
 */
export function relation(a: InternalFieldName, b: InternalFieldName) {
  const len = Math.min(a.length, b.length)

  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return false
  }

  return len > 0
}

/**
 * @description 是否是合法的索引
 */
export function isValidIndex(array: any[], ...positions: number[]) {
  const len = array.length

  return positions.every(pos => pos >= 0 && pos < len)
}
