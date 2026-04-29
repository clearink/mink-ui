import type { Context } from 'react'

import { createContext, use } from 'react'

import { betterDisplayName } from './better-display-name'

export function ctxHelper<R>(init: R, ctxName?: string) {
  const Context = createContext(init) as { useState: () => R } & Context<R>

  Context.useState = () => use(Context)

  betterDisplayName(Context, ctxName)

  return Context
}
