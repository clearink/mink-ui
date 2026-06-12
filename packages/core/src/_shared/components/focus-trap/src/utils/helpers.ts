import { isFunction } from '@mink-ui/shared/is/is-function'

export function focusElement(el: HTMLElement | null) {
  if (el && isFunction(el.focus)) {
    el.focus({ preventScroll: true })
  }
}
