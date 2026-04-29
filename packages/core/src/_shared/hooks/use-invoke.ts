import { useMemo } from 'react'
import { execute } from '@mink-ui/shared/function/execute'

const useHook = process.env.NODE_ENV === 'production' ? execute : useMemo

/**
 * @description 兼容 react-devtool, 每次渲染都会执行 (仅在开发环境)
 */
export function useInvoke<T>(factory: () => T): T {
  return useHook(factory, [factory])
}
