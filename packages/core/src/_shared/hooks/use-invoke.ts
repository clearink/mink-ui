import { useMemo } from 'react'

/**
 * @description 兼容 react-devtools
 */
export function useInvoke<T>(factory: () => T): T {
  return useMemo(factory, [factory])
}
