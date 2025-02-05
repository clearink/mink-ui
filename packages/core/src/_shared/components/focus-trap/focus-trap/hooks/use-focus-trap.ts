import { keyboard } from '@mink-ui/core/_shared/constants'
import { useConstant } from '@mink-ui/core/_shared/hooks'

import focusElement from '../../utils/focus-element'
import getSiblings from '../../utils/get-siblings'
import trapManager from '../../utils/trap-manager'

class FocusTrapRefs {
  $start = { current: null as HTMLDivElement | null }

  $end = { current: null as HTMLDivElement | null }

  isShiftTab = false

  latestFocus: HTMLElement | null = null

  returnFocus: Element | null = null

  get start() {
    return this.$start.current
  }

  get end() {
    return this.$end.current
  }

  reset = () => {
    this.latestFocus = null
    this.returnFocus = null
  }
}

export default function useFocusTrap() {
  const refs = useConstant(() => new FocusTrapRefs())

  const handleFocusTrap = (root: Document) => {
    const handle = (target: HTMLElement) => {
      const containers = getSiblings(refs.start!, refs.end!)

      if (!containers.length || !target) return

      const active = root.activeElement

      if (active !== refs.start && active !== refs.end) {
        if (containers.some(el => el === target || el.contains(target))) {
          refs.latestFocus = target
          return
        }

        if (refs.latestFocus) return focusElement(refs.latestFocus)
      }

      focusElement(refs.isShiftTab ? refs.end : refs.start)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      refs.isShiftTab = e.key === keyboard.tab && e.shiftKey

      handle(e.target as HTMLElement)
    }

    const onFocusIn = (e: FocusEvent) => {
      e.stopImmediatePropagation()

      handle(e.target as HTMLElement)
    }

    return trapManager.register(root, { onFocusIn, onKeyDown })
  }

  const handleCleanup = () => {
    refs.latestFocus = null
    refs.returnFocus = null
  }

  return {
    refs,
    handleCleanup,
    handleFocusTrap,
  }
}
