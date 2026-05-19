import type { CSSProperties } from 'react'

export const visuallyHidden: CSSProperties = {
  position: 'fixed',
  overflow: 'hidden',
  width: 0,
  height: 0,
  top: -1,
  left: -1,
  padding: 0,
}
