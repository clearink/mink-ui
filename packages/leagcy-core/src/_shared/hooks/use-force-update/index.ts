import { useReducer } from 'react'

export function useForceUpdate() {
  return useReducer(count => count + 1, 0)[1]
}
