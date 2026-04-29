import type { Context } from 'react'

import { createContext, use } from 'react'

/**
 * @description context 使用优化函数
 */
export function ctxHelper<R>(displayName: string, defaultValue: R) {
  const Context: any = createContext(defaultValue)

  Context.use = () => use(Context)

  const __PROD__ = process.env.NODE_ENV === 'production'

  if (!__PROD__) Context.displayName = displayName

  return Context as { use: () => R } & Context<R>
}
