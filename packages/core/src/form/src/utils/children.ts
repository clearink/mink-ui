import type { FormInstance } from '../_shared.props'
import type { OmittedFormItemLabelProps, PickedFormItemLabelProps } from '../form-item-label.props'
import type { OmittedFormItemProps, PickedFormItemProps } from '../form-item.props'

import { cloneElement, isValidElement } from 'react'

import { isValidUsage } from './validate'

/**
 * @description 预处理 Form.Item 子元素
 */
export function prepareFormItemChildren(
  picked: PickedFormItemProps,
  omitted: OmittedFormItemProps,
  formInstance: FormInstance | null,
) {
  const [valid, children, functional] = isValidUsage(picked, omitted)

  if (!valid) {
    return {
      inject: false,
      element: valid === null ? children : null,
    }
  }

  if (functional) {
    return {
      inject: true,
      element: (...args: any[]) => children(formInstance || args[2]),
    } as const
  }

  if (!isValidElement<object>(children)) {
    return {
      inject: true,
      element: children,
    }
  }

  return {
    inject: true,
    element: children,
    valid: true,
  }
}

export interface NormalizeFormItemChildrenOptions {
  itemId: string | undefined
  required: boolean | undefined
  result: ReturnType<typeof prepareFormItemChildren>
  hasError: boolean
  errors: any[]
  omitted: OmittedFormItemProps
}

/**
 * @description 格式化 Form.Item 子元素
 */
export function normalizeFormItemChildren(options: NormalizeFormItemChildrenOptions) {
  const { itemId, required, result, hasError, errors, omitted } = options
  const { inject, valid, element } = result
  const { extra } = omitted

  if (!inject) return [false, element, null] as const

  if (!valid || !inject) return [true, element, false] as const

  const cloned: any = { ...element.props }

  if (!cloned.id && itemId) cloned.id = itemId

  if (errors.length) cloned['aria-invalid'] = 'true'

  if (required) cloned['aria-required'] = 'true'

  let desc = hasError ? `${itemId}_help` : ''
  if (extra) desc += `${desc ? ' ' : ''}${itemId}_extra`
  if (desc) cloned['aria-describedby'] = desc

  // TODO: ref 用于 focus input
  // cloned.ref = getItemRef(itemName, itemElement)

  return [true, cloneElement(element, cloned), true] as const
}

/**
 * @description 格式化 ItemLabel 子元素
 */
export function normalizeFormItemLabelChildren(
  picked: PickedFormItemLabelProps,
  omitted: OmittedFormItemLabelProps,
) {
  const { requiredMark } = picked
  const { label, required, tooltip } = omitted

  const element = label

  if (requiredMark === 'optional' && !required) {
    // TODO optional mark
  }

  if (tooltip) {
    // TODO tooltip
  }

  return element
}
