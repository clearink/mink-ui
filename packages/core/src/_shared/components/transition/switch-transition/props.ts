import type { ReactElement } from 'react'

import type { CssTransitionProps as CssProps } from '../css-transition/props'

export type SwitchMode = 'default' | 'in-out' | 'out-in'

export interface SwitchTransitionProps<E extends HTMLElement>
  extends Omit<CssProps<E>, 'children' | 'unmountOnExit' | 'when'> {
  mode?: SwitchMode
  children: ReactElement
}

export interface SwitchElementItem {
  freeze: boolean
  node: ReactElement
  key: ReactElement['key']
}
