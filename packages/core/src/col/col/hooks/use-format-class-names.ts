import { cls } from '@mink-ui/core/_shared/utils'
import { isObject, isUndefined } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { ColProps } from '../props'

export default function useFormatClassNames(prefixCls: string, props: ColProps) {
  const {
    offset,
    order,
    pull,
    push,
    span,
    sm,
    md,
    xs,
    lg,
    xl,
    xxl,
    className,
    classNames = {},
  } = props

  const extraClass = useMemo(() => {
    return Object.entries({ sm, md, xs, lg, xl, xxl }).reduce((res, [size, breakpoint]) => {
      if (isUndefined(breakpoint)) return res

      if (isObject(breakpoint)) {
        res[`${prefixCls}-${size}-${breakpoint.span}`] = breakpoint.span
        res[`${prefixCls}-${size}-${breakpoint.offset}`] = breakpoint.offset
        res[`${prefixCls}-${size}-${breakpoint.pull}`] = breakpoint.pull
        res[`${prefixCls}-${size}-${breakpoint.push}`] = breakpoint.push
        res[`${prefixCls}-${size}-${breakpoint.order}`] = breakpoint.order
        return res
      }

      res[`${prefixCls}-${size}-${breakpoint}`] = breakpoint

      return res
    }, {})
  }, [lg, md, prefixCls, sm, xl, xs, xxl])

  return {
    root: cls(
      prefixCls,
      extraClass,
      {
        [`${prefixCls}-${span}`]: !isUndefined(span),
        [`${prefixCls}-offset-${offset}`]: offset,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-pull-${pull}`]: pull,
        [`${prefixCls}-push-${push}`]: push,
      },
      className,
      classNames.root,
    ),
  }
}
