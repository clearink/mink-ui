import type { InternalFieldName } from '../_shared.props'

import { isArray } from '@mink-ui/shared/is/is-array'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isNumber } from '@mink-ui/shared/is/is-number'
import { isObject } from '@mink-ui/shared/is/is-object'
import { isPureObject } from '@mink-ui/shared/is/is-pure-object'
import { hasOwn } from '@mink-ui/shared/object/has-own'
import { rawType } from '@mink-ui/shared/object/raw-type'

import { COPIED, DELETE } from '../_shared.constant'

function _define(source: any, attr: InternalFieldName[number], clone: boolean) {
  if (isArray(source)) return clone ? [...source] : source

  if (isObject(source)) return clone ? { ...source } : source

  if (isNullish(source) && isNumber(attr)) return []

  return { ...source }
}

function _defineIn(
  source: any,
  path: InternalFieldName,
  value: any,
  copied: Record<string, any>,
  cursor: number,
) {
  if (cursor >= path.length) return [value, null]

  const attr = path[cursor]

  const data = _define(source, attr, !hasOwn(copied, COPIED))

  if (!copied[attr]) copied[attr] = Object.create(null)

  const result = _defineIn(data[attr], path, value, copied[attr], cursor + 1)

  data[attr] = result[0]

  copied[attr] = result[1]

  // 特殊标记，表示是否已经拷贝过
  Object.defineProperty(copied, COPIED, { value: true })

  return [data, copied]
}

/**
 * @description 设置对应路径的值 (减少不必要的数据拷贝)
 */
export function defineIn<V = any>(
  source: V,
  path: InternalFieldName,
  value: any,
  copied: Record<string, any>,
): V {
  return !isObject(source) ? source : _defineIn(source, path, value, copied, 0)[0]
}

function _deleteIn(
  source: any,
  path: InternalFieldName,
  copied: Record<string, any>,
  cursor: number,
) {
  if (cursor >= path.length) return [source, null, DELETE]

  const attr = path[cursor]

  // source 不是对象
  if (!isObject(source)) return [source, null]

  // 不存在该属性
  if (!hasOwn(source, attr)) return [source, null]

  const data = _define(source, attr, !hasOwn(copied, COPIED))

  if (!copied[attr]) copied[attr] = Object.create(null)

  const result = _deleteIn(data[attr], path, copied[attr], cursor + 1)

  result[2] === DELETE ? delete data[attr] : data[attr] = result[0]

  copied[attr] = result[1]

  // 特殊标记，表示是否已经拷贝过
  Object.defineProperty(copied, COPIED, { value: true })

  return [data, copied]
}

/**
 * @description 删除对应路径的值 (减少不必要的数据拷贝)
 */
export function deleteIn<V = any>(
  source: V,
  path: InternalFieldName,
  copied: Record<string, any>,
): V {
  return !isObject(source) ? source : _deleteIn(source, path, copied, 0)[0]
}

function _mergeIn(source: any, target: any, map = new WeakMap()) {
  if (map.has(source)) return map.get(source)

  if (rawType(source) !== rawType(target)) return target

  // 不是 array && 不是原始 object
  if (!isArray(source) && !isPureObject(source)) return target

  // 数组替换时直接使用最新值
  const merged = isArray(source) ? [] : { ...source }

  map.set(source, merged)

  return Object.entries(target).reduce((result, [k, v]) => {
    (result as any)[k] = _mergeIn((source as any)[k], v, map)

    return result
  }, merged)
}

/**
 * @description 合并对象
 */
export function mergeIn<V = any>(source: V, ...targets: any[]) {
  const init = isArray(source) ? [...source] : { ...source }

  return targets.reduce((result, target) => _mergeIn(result, target), init)
}
