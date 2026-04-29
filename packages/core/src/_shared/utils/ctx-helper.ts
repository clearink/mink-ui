import type { Context } from 'react'

import { createContext, use } from 'react'

import { defineName } from './define-name'

/**
 * @description context 使用优化函数
 */
export function ctxHelper<R>(displayName: string, defaultValue: R) {
  const Context: any = createContext(defaultValue)

  // eslint-disable-next-line react/component-hook-factories
  Context.use = () => use(Context)

  defineName(Context, displayName)

  return Context as { use: () => R } & Context<R>
}
