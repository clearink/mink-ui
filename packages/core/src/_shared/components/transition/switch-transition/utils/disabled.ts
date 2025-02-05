import { atIndex } from '@mink-ui/shared'

import type { TransitionState } from '../hooks/use-transition-store'

export function isExitDisabled<E extends HTMLElement>(states: TransitionState<E>) {
  const { components, elements } = states

  const { key } = atIndex(elements, 0)

  const instance = components.get(key)

  return !instance || instance.isExited
}

export function isEnterDisabled<E extends HTMLElement>(states: TransitionState<E>) {
  const { components, elements } = states

  if (elements.length < 2) return false

  const { key } = atIndex(elements, -1)

  const instance = components.get(key)

  return !instance || instance.isEntered
}
