import type { AnyObj } from '@mink-ui/shared'

import { flattenChildren } from '@mink-ui/core/_shared/utils'
import { isFunction } from '@mink-ui/shared'
import { type ReactElement, type ReactNode, isValidElement } from 'react'

import type { InternalFormInstance } from '../../form/control/props'
import type { FormFieldControl } from '../control'
import type { InternalFormFieldProps } from '../props'

/** 格式化 Form.Field children */
export default function normalizeChildren(
  collectInject: () => AnyObj,
  instance: InternalFormInstance,
  control: FormFieldControl,
) {
  return function normalizeInner(children: InternalFormFieldProps['children']): {
    children: ReactNode
    functional?: true
    valid: boolean
  } {
    if (isFunction(children)) {
      const element = children(collectInject(), control.meta, instance)
      return { ...normalizeInner(element as ReactElement), functional: true }
    }
    // 去除 fragment，nullish 后
    const childList = flattenChildren(children)

    // Form.Field 直接包裹的元素，且是 合法的 reactELement
    if (childList.length === 1 && isValidElement(childList[0])) return { children: childList[0], valid: true }

    return { children: childList, valid: false }
  }
}
