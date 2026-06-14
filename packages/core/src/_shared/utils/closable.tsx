import type { MayBe } from '@mink-ui/shared/interface'
import type { CloseIconRender, CommonClosable, HasClosable } from '../types/closable'

import { cloneElement, isValidElement } from 'react'
import CloseOutlined from '@mink-ui/icons/CloseOutlined'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { omit } from '@mink-ui/shared/object/omit'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { excludedClosableConfig } from '../types/closable'

export interface NormalizeClosableOptions {
  currentState: MayBe<HasClosable>
  contextState?: MayBe<HasClosable>
  defaultState?: HasClosable
}

/**
 * @description 格式化 closable state
 */
function formatClosableState(closableState: MayBe<HasClosable>) {
  const closableValue = closableState?.closable

  return closableValue === true ? {} : closableValue
}

/**
 * @description 格式化 closable icon
 */
function formatClosableIcon(
  closableState: false | CommonClosable | undefined,
  iconRender: CloseIconRender | undefined,
) {
  if (!closableState) return null

  const { closeIcon, disabled } = closableState

  const ariaAttrs = omit(closableState, excludedClosableConfig)

  if (disabled) ariaAttrs['aria-disabled'] = disabled

  const iconElement = iconRender ? iconRender(closeIcon, disabled) : closeIcon

  if (isValidElement(iconElement)) return cloneElement(iconElement, ariaAttrs)

  return <span {...ariaAttrs}>{iconElement}</span>
}

/**
 * @description 格式化 closable 配置
 */
export function normalizeClosable(options: NormalizeClosableOptions) {
  const { currentState, contextState, defaultState } = options

  const closableStates = [
    formatClosableState(currentState),
    formatClosableState(contextState),
    formatClosableState(defaultState),
  ]

  const primaryState = closableStates.find(s => !isUndefined(s))

  const closableState = primaryState && shallowMerge<CommonClosable>(
    ...closableStates.filter((s): s is CommonClosable => !!s),
    { closeIcon: <CloseOutlined /> },
  )

  return [
    closableState || undefined,
    (closeIconRender?: CloseIconRender) => formatClosableIcon(closableState, closeIconRender),
  ] as const
}
