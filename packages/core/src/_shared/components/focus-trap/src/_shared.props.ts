import type { KeyboardEvent } from 'react'

export interface FocusTrapItem {
  onFocusIn: (event: FocusEvent) => void
  onKeyDown: (event: KeyboardEvent) => void
}
