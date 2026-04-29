import * as React from 'react'
import { isBrowser } from '@mink-ui/shared/dom/is-browser'

// SSR 时无法执行 React.useLayoutEffect 故使用 React.useEffect
export const useIsomorphicEffect = isBrowser ? React.useLayoutEffect : React.useEffect
