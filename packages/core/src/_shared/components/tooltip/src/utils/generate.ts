import type { AnyFn } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../../types/state-dispatch'

// 除了 hover 时， popup 都是使用 click 结束 close 的

/**
 * @description hover 触发时 popup 需要的事件
 */
export function getHoverEvents(
  handleChange: SetStateDispatch<boolean>,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onMouseEnter = () => { handleChange(() => true) }

  const onMouseLeave = () => { handleChange(() => false) }

  return [
    { onMouseEnter, onMouseLeave },
    { onMouseEnter, onMouseLeave },
  ]
}

/**
 * @description click 触发时 popup 需要的事件
 */
export function getClickEvents(
  handleChange: SetStateDispatch<boolean>,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onClick = () => { handleChange(state => !state) }

  return [{ onClick }, {}]
}

/**
 * @description focus 触发时 popup 需要的事件
 */
export function getFocusEvents(
  handleChange: SetStateDispatch<boolean>,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onFocus = () => { handleChange(() => true) }

  const onBlur = () => { handleChange(() => false) }

  return [{ onBlur, onFocus }, {}]
}

/**
 * @description contextmenu 触发时 popup 需要的事件
 */
export function getMenusEvents(
  handleChange: SetStateDispatch<boolean>,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onContextMenu = (e: MouseEvent) => { e.preventDefault(); handleChange(state => !state) }

  return [{ onContextMenu }, {}]
}
