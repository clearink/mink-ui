import type { FormItemProps, PickedFormItemProps } from '../form-item.props'

import { isFunction } from '@mink-ui/shared/is/is-function'

import { flattenChildren } from '../../../_shared/utils/children'

/**
 * @description 拍平子元素，去除 nullish 值
 */
export function flattenFormItemChildren(props: FormItemProps): PickedFormItemProps['children'] {
  const { children } = props

  if (isFunction(children)) return children

  const elements = flattenChildren(children)

  return elements.length <= 1 ? elements[0] : elements
}
