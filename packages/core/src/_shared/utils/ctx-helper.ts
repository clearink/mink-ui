import { createContext, useContext } from 'react'

import { betterDisplayName } from './better-display-name'

export function ctxHelper<R>(init: R, ctxName?: string) {
  const Context = createContext(init)

  betterDisplayName(Context, ctxName)

  return {
    Consumer: Context.Consumer,
    Provider: Context.Provider,
    useState: () => useContext(Context),
  }
}
