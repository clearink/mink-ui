import type { ReactElement, ReactNode } from 'react'

import { Children } from 'react'
import { isFragment } from 'react-is'

import { isNullish, pushItem } from '@mink-ui/shared'

/**
 * @desc 去除 nullish, 去除 fragment， 拍平 children
 */
type ReactChild = number | ReactElement | string
export function flattenChildren(children: ReactNode): ReactChild[] {
  return Children.toArray(children).reduce((result: ReactChild[], child) => {
    if (isNullish(child)) return result

    if (!isFragment(child) || !child.props) return pushItem(result, child as ReactElement)

    return pushItem(result, flattenChildren(child.props.children))
  }, [])
}
