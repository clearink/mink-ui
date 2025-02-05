import { hasOwn, isArray, isNullish, isNumber, isObject, rawType } from '@mink-ui/shared'

import type { InternalNamePath } from '../_shared.props'

function _setIn<V = any>(source: V, paths: InternalNamePath, value: any, cursor: number): V {
  if (cursor >= paths.length) return value

  const attr = paths[cursor]

  let data = {} as V

  if (isArray(source)) data = source.concat() as unknown as V
  else if (isObject(source)) data = { ...source }
  else if (isNumber(attr)) data = [] as unknown as V

  data[attr] = _setIn(data[attr], paths, value, cursor + 1)

  return data
}

export function setIn<V = any>(source: V, paths: InternalNamePath, value: any): V {
  return !isObject(source) ? source : _setIn(source, paths, value, 0)
}

export function getIn<V = any>(values: V, paths: InternalNamePath): any {
  const len = paths.length

  for (let i = 0; i < len; i++) {
    if (isNullish(values)) return values
    values = values[paths[i]]
  }

  // 空路径返回 undefined
  return len ? values : undefined
}

function _deleteIn<V = any>(source: V, paths: InternalNamePath, cursor: number): V {
  if (cursor >= paths.length) return source

  const attr = paths[cursor]

  if (!hasOwn(source as any, attr)) return source

  if (cursor === paths.length - 1) delete source[attr]
  else _deleteIn(source[attr], paths, cursor + 1)

  return source
}

// 删除指定字段
export function deleteIn<V = any>(source: V, paths: InternalNamePath): any {
  return !isObject(source) ? source : _deleteIn(source, paths, 0)
}

// 合并对象
function internalMerge(target: any, source: any, map = new WeakMap()) {
  if (rawType(target) !== rawType(source)) return source

  if (!isObject(target)) return source

  if (map.has(target)) return map.get(target)

  // 数组直接覆盖
  if (isArray(target)) return source

  // 其他非基础类型数据
  if (!isObject(target)) return target

  const init = { ...target }

  map.set(target, init)

  return Object.entries(source).reduce((result, [key, value]) => {
    result[key] = internalMerge(result[key], value, map)

    return result
  }, init)
}

// 合并数据
export function mergeValue<V = any>(target: V, ...sources: any[]): V {
  const init = isArray(target) ? target.concat() : { ...target }

  return sources.reduce((result, current) => internalMerge(result, current), init)
}

// 仅复制路径下的值
export function cloneWithPath<V>(source: V, paths: InternalNamePath) {
  if (!isObject(source) || !paths.length) return source

  const [path, ...rest] = paths
  const init = isArray(source) ? [] : {}
  init[path] = cloneWithPath(source[path], rest)

  return init as V
}

export function hasOwnWithPath<V>(source: V, paths: InternalNamePath) {
  const len = paths.length

  for (let i = 0; i < len; i++) {
    const key = paths[i]

    if (!hasOwn(source as any, key)) return false

    source = source[key]
  }

  return !!len
}
