import type { GlobalConfig } from '../_shared.props'

/**
 * @description 全部配置是否不相等
 */
export function shouldGlobalConfigUpdate(prev: GlobalConfig, next: GlobalConfig) {
  if (prev === next) return false

  const prevKeys = Object.keys(prev) as (keyof GlobalConfig)[]
  const nextKeys = Object.keys(next) as (keyof GlobalConfig)[]

  if (prevKeys.length !== nextKeys.length) return true

  return prevKeys.some(key => prev[key] !== next[key])
}
