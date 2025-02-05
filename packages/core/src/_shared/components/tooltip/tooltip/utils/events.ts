import type { DOMAttributes, MouseEventHandler } from 'react'

import type useTooltipOpen from '../hooks/use-tooltip-open'

// 除了 hover 时， popup 都是使用 click 结束 close 的
// hover
export function getHoverEvents(
  setIsOpen: ReturnType<typeof useTooltipOpen>[1],
): [DOMAttributes<HTMLElement>, DOMAttributes<HTMLElement>] {
  const onMouseEnter = () => {
    setIsOpen(() => true)
  }

  const onMouseLeave = () => {
    setIsOpen(() => false)
  }

  return [
    { onMouseEnter, onMouseLeave },
    { onMouseEnter, onMouseLeave },
  ]
}

// click
export function getClickEvents(
  setIsOpen: ReturnType<typeof useTooltipOpen>[1],
): [DOMAttributes<HTMLElement>, DOMAttributes<HTMLElement>] {
  const onClick = () => {
    setIsOpen(state => !state)
  }

  return [{ onClick }, {}]
}

// focus
export function getFocusEvents(
  setIsOpen: ReturnType<typeof useTooltipOpen>[1],
): [DOMAttributes<HTMLElement>, DOMAttributes<HTMLElement>] {
  const onFocus = () => {
    setIsOpen(() => true)
  }

  const onBlur = () => {
    setIsOpen(() => false)
  }

  return [{ onBlur, onFocus }, {}]
}

// contextmenu
export function getContextMenuEvents(
  setIsOpen: ReturnType<typeof useTooltipOpen>[1],
): [DOMAttributes<HTMLElement>, DOMAttributes<HTMLElement>] {
  const onContextMenu: MouseEventHandler = (e) => {
    e.preventDefault()

    setIsOpen(state => !state)
  }

  return [{ onContextMenu }, {}]
}
