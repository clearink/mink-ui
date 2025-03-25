import { hasOwn, isArray, isNullish, isNumber, isObject, isPureObject, rawType } from '@mink-ui/shared'

import type { InternalNamePath } from '../_shared.props'

function _clone<V = any>(source: V, attr: InternalNamePath[number]): V {
  if (isArray(source)) return [...source] as V

  if (isObject(source)) return { ...source }

  if (isNullish(source) && isNumber(attr)) return [] as V

  return { ...source } as V
}

function _setIn<V = any>(source: V, paths: InternalNamePath, value: any, cursor: number): V {
  if (cursor >= paths.length) return value

  const attr = paths[cursor]

  const data = _clone(source, attr)

  data[attr] = _setIn(data[attr], paths, value, cursor + 1)

  return data
}

export function setIn<V = any>(source: V, paths: InternalNamePath, value: any): V {
  return !isObject(source) ? source : _setIn(source, paths, value, 0)
}

export function getIn<V = any>(entity: V, paths: InternalNamePath): any {
  const len = paths.length

  for (let i = 0; i < len; i++) {
    if (isNullish(entity)) return undefined

    entity = entity[paths[i]]
  }

  // 空路径返回 undefined
  return len > 0 ? entity : undefined
}

// 也需要深拷贝
function _deleteIn<V = any>(source: V, paths: InternalNamePath, cursor: number): V {
  if (cursor >= paths.length) return source

  const attr = paths[cursor]

  // source 不是对象 || 不存在该属性
  if (!isObject(source as any)) return source

  // 不存在该属性
  if (!hasOwn(source as any, attr)) return source

  const data = _clone(source, attr)

  if (cursor === paths.length - 1) delete data[attr]
  else data[attr] = _deleteIn(data[attr], paths, cursor + 1)

  return data
}

// 删除指定字段
export function deleteIn<V = any>(source: V, paths: InternalNamePath): any {
  return !isObject(source) ? source : _deleteIn(source, paths, 0)
}

// 合并对象
function _merge(target: any, source: any, map = new WeakMap()) {
  if (map.has(target)) return map.get(target)

  if (rawType(target) !== rawType(source)) return source

  // 不是 Array && 不是原始的 Object
  if (!isArray(target) && !isPureObject(target)) return source

  // 数组替换时需要直接使用最新值
  const merged = isArray(target) ? [] : { ...target }

  map.set(target, merged)

  return Object.entries(source).reduce((result, [key, value]) => {
    result[key] = _merge(target[key], value, map)

    return result
  }, merged)
}

// 合并数据
export function merge<V = any>(target: V, ...sources: any[]): V {
  const init = isArray(target) ? [...target] : { ...target }

  return sources.reduce((result, current) => _merge(result, current), init)
}

// 设置对象值, 但不进行拷贝
function _defineIn<V = any>(source: V, paths: InternalNamePath, value: any, cursor: number): V {
  if (cursor >= paths.length) return value

  const attr = paths[cursor]

  let data = {} as V

  if (isObject(source[attr])) data = source[attr] as V
  else if (isNumber(paths[cursor + 1])) data = [] as V

  source[attr] = _defineIn(data, paths, value, cursor + 1)

  return source
}

export function defineIn<V = any>(source: V, paths: InternalNamePath, value: any): V {
  return !isObject(source) ? source : _defineIn(source, paths, value, 0)
}
