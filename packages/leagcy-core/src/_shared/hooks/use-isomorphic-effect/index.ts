import React from 'react'

import { isBrowser } from '@mink-ui/shared'

// SSR 时无法执行 React.useEffect 故使用 React.useLayoutEffect
export const useIsomorphicEffect = isBrowser ? React.useLayoutEffect : React.useEffect
