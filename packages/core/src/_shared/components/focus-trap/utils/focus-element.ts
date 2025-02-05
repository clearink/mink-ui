export default function focusElement(el: HTMLElement | null) {
  el && el.focus({ preventScroll: true })
}
