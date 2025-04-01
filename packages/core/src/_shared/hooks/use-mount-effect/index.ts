import { useEffect } from 'react'

export function useMountEffect(effect: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { effect() }, [])
}
