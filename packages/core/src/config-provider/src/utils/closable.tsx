import type { MayBe } from '@mink-ui/shared/interface'
import type { HasClosable } from '../../../_shared/types'
import type { HasClosableWithIconRender } from '../../../_shared/types/closable'

import { cloneElement, isValidElement } from 'react'
import CloseOutlined from '@mink-ui/icons/CloseOutlined'
import { isNull } from '@mink-ui/shared/is/is-null'
import { isObject } from '@mink-ui/shared/is/is-object'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { omit } from '@mink-ui/shared/object/omit'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

export interface NormalizeClosableOptions {
  currentState: MayBe<HasClosable>
  contextState?: HasClosable
  defaultState?: HasClosableWithIconRender
}

/**
 * @description 格式化 closable config
 */
function formatClosableState(closableState: MayBe<HasClosable>) {
  const closableValue = closableState ? closableState.closable : undefined

  const closeIconValue = closableState ? closableState.closeIcon : undefined

  if (isUndefined(closableValue)) {
    if (isNull(closeIconValue)) return false

    if (isUndefined(closeIconValue)) return undefined

    return { closeIcon: closeIconValue }
  }

  if (closableValue === false) return false

  const defaultConfig = { closeIcon: closeIconValue }

  return isObject(closableValue) ? shallowMerge(closableValue, defaultConfig) : defaultConfig
}

/**
 * @description 格式化 closable icon
 */
function formatClosableIcon(
  finallyClosable: false | HasClosable | HasClosableWithIconRender,
  defaultClosable: HasClosableWithIconRender,
) {
  if (!finallyClosable) return null

  const { closeIcon } = finallyClosable

  const { closeIconRender } = defaultClosable

  const ariaAttrs = omit(finallyClosable, ['closable', 'closeIcon', 'closeIconRender'] as any[])

  const iconElement = closeIconRender ? closeIconRender(closeIcon) : closeIcon

  if (isValidElement(iconElement)) return cloneElement(iconElement, ariaAttrs)

  return <span {...ariaAttrs}>{iconElement}</span>
}

/**
 * @description 格式化 closable 配置
 */
export function normalizeClosable(options: NormalizeClosableOptions) {
  const { currentState, contextState, defaultState } = options

  const currentClosable = formatClosableState(currentState)

  const contextClosable = formatClosableState(contextState)

  const defaultClosable = shallowMerge(defaultState || {}, { closeIcon: <CloseOutlined /> })

  let finallyClosable: false | HasClosable | HasClosableWithIconRender

  if (currentClosable === false) finallyClosable = false
  else if (currentClosable) finallyClosable = shallowMerge(currentClosable, contextClosable || {}, defaultClosable)
  else if (contextClosable === false) finallyClosable = false
  else finallyClosable = defaultClosable.closable ? defaultClosable : false

  return { closable: finallyClosable !== false, closeIcon: formatClosableIcon(finallyClosable, defaultClosable) }
}
