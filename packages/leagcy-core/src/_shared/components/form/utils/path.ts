import type { ExternalNamePath, InternalNamePath } from '../_shared.props'

import { rawType, toArray } from '@mink-ui/shared'

export function _getId(namePath?: ExternalNamePath) {
  return toArray(namePath).reduce<string>((str, path, i) => {
    return `${str}${i > 0 ? '_' : ''}${rawType(path)}:${path}`
  }, '')
}

export function isValidIndex(array: any[], ...positions: number[]) {
  const len = array.length

  return positions.every(position => position < len && position >= 0)
}

// 具有相同的父路径或者是同一个路径
export function hasSameSuffix(a: InternalNamePath, b: InternalNamePath) {
  const len = Math.min(a.length, b.length)

  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return false
  }

  return len > 0
}

// 是否为父路径或自身
export function isParentOf(parent: InternalNamePath, child: InternalNamePath) {
  const len = Math.min(parent.length, child.length)
  if (len === 0) return false

  for (let i = 0; i < len; i++) {
    if (parent[i] !== child[i]) return false
  }

  return true
}
