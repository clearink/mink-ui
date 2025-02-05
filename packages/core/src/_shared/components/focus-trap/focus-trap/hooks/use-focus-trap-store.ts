import { keyboard } from '@mink-ui/core/_shared/constants'
import { useConstant } from '@mink-ui/core/_shared/hooks'
import { useMemo } from 'react'

import focusElement from '../../utils/focus-element'
import getSiblings from '../../utils/get-siblings'
import trapManager from '../../utils/trap-manager'

export class FocusTrapState {
  $start = { current: null as HTMLDivElement | null }

  $end = { current: null as HTMLDivElement | null }

  isShiftTab = false

  latestFocus: HTMLElement | null = null

  returnFocus: Element | null = null
}

export class FocusTrapAction {
  constructor(private states: FocusTrapState) {}

  handleCleanup = () => {
    this.states.latestFocus = null

    this.states.returnFocus = null
  }

  handleFocusTrap = (root: Document) => {
    const handle = (target: HTMLElement) => {
      const { $start, $end, latestFocus, isShiftTab } = this.states

      const containers = getSiblings($start.current!, $end.current!)

      if (!containers.length || !target) return

      const active = root.activeElement

      if (active !== $start.current && active !== $end.current) {
        if (containers.some(el => el.contains(target) || el === target)) {
          this.states.latestFocus = target
          return
        }

        if (latestFocus) return focusElement(latestFocus)
      }

      focusElement(isShiftTab ? $end.current : $start.current)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      this.states.isShiftTab = e.key === keyboard.tab && e.shiftKey

      handle(e.target as HTMLElement)
    }

    const onFocusIn = (e: FocusEvent) => {
      e.stopImmediatePropagation()

      handle(e.target as HTMLElement)
    }

    return trapManager.register(root, { onFocusIn, onKeyDown })
  }
}

export default function useFocusTrapStore() {
  const states = useConstant(() => new FocusTrapState())

  const actions = useMemo(() => new FocusTrapAction(states), [states])

  return { states, actions }
}
