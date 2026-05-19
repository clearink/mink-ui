import type { MayBe } from '@mink-ui/shared/interface'
import type { CommonFocusable, HasFocusable } from '../types/focusable'

import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

export interface NormalizeFocusableOptions {
  currentState: MayBe<HasFocusable>
  contextState?: MayBe<HasFocusable>
  defaultState?: HasFocusable
}

/**
 * @description 格式化 focusable state
 */
function formatFocusableState(focusableState: MayBe<HasFocusable>) {
  const focusableValue = focusableState?.focusable

  return focusableValue === true ? {} : focusableValue
}

/**
 * @description 格式化 focusable 配置
 */
export function normalizeFocusable(options: NormalizeFocusableOptions) {
  const { currentState, contextState, defaultState } = options

  const focusableStates = [
    formatFocusableState(currentState),
    formatFocusableState(contextState),
    formatFocusableState(defaultState),
  ]

  const primaryState = focusableStates.find(s => !isUndefined(s))

  const focusableState = primaryState && shallowMerge<CommonFocusable>(
    ...focusableStates.filter((s): s is CommonFocusable => !!s),
    { focusTrap: true, returnFocus: true },
  )

  return focusableState || undefined
}
