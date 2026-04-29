import type { AnyFn } from '@mink-ui/shared/interface'
import type { IsOpenChangeHandler } from '../_shared.props'

// 除了 hover 时， popup 都是使用 click 结束 close 的

/**
 * @description hover 触发时 popup 需要的事件
 */
export function getHoverEvents(
  isOpenChange: IsOpenChangeHandler,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onMouseEnter = () => {
    isOpenChange(() => true)
  }

  const onMouseLeave = () => {
    isOpenChange(() => false)
  }

  return [
    { onMouseEnter, onMouseLeave },
    { onMouseEnter, onMouseLeave },
  ]
}

/**
 * @description click 触发时 popup 需要的事件
 */
export function getClickEvents(
  isOpenChange: IsOpenChangeHandler,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onClick = () => {
    isOpenChange(state => !state)
  }

  return [{ onClick }, {}]
}

/**
 * @description focus 触发时 popup 需要的事件
 */
export function getFocusEvents(
  isOpenChange: IsOpenChangeHandler,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onFocus = () => {
    isOpenChange(() => true)
  }

  const onBlur = () => {
    isOpenChange(() => false)
  }

  return [{ onBlur, onFocus }, {}]
}

/**
 * @description contextmenu 触发时 popup 需要的事件
 */
export function getMenusEvents(
  isOpenChange: IsOpenChangeHandler,
): [Record<string, AnyFn>, Record<string, AnyFn>] {
  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault()

    isOpenChange(state => !state)
  }

  return [{ onContextMenu }, {}]
}
