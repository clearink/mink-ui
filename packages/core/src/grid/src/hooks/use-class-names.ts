import type { AnyObj } from '@mink-ui/shared/interface'
import type { GridAlign, GridJustify } from '../_shared.props'
import type { ColProps } from '../col.props'
import type { OmittedRowProps, PickedRowProps } from '../row.props'

import { useMemo } from 'react'
import { isObject } from '@mink-ui/shared/is/is-object'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { formatGridFlex } from '../utils/format'

export function useRowClassNames(
  picked: PickedRowProps,
  omitted: OmittedRowProps,
  justify: GridJustify | undefined,
  align: GridAlign | undefined,
) {
  const { wrap } = picked
  const { prefixCls } = omitted

  const ns = useNamespace('row', prefixCls)

  return {
    root: cn(ns, {
      [`${ns}--wrap`]: wrap,
      [`${ns}--align-${align}`]: align,
      [`${ns}--justify-${justify}`]: justify,
    }),

  }
}

export function useColClassNames(omitted: ColProps) {
  const {
    span,
    flex,
    offset,
    order,
    pull,
    push,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    prefixCls,
  } = omitted

  const ns = useNamespace('col', prefixCls)

  const [classes, cssVars] = useMemo(() => {
    const result: AnyObj = {}
    const aligns: AnyObj = {}

    const generate = (size: string, point: typeof xs) => {
      if (isUndefined(point)) return

      if (!isObject(point)) {
        return result[`${ns}-${size}--${point}`] = !isUndefined(point)
      }

      result[`${ns}-${size}--${point.span}`] = !isUndefined(point.span)
      result[`${ns}-${size}--offset-${point.offset}`] = !isUndefined(point.offset)
      result[`${ns}-${size}--order-${point.order}`] = !isUndefined(point.order)
      result[`${ns}-${size}--pull-${point.pull}`] = !isUndefined(point.pull)
      result[`${ns}-${size}--push-${point.push}`] = !isUndefined(point.push)
      result[`${ns}-${size}--flex`] = !isUndefined(point.flex)

      const alignment = formatGridFlex(point.flex)

      if (!isUndefined(alignment)) aligns[`--${ns}-${size}--flex`] = alignment
    }

    generate('xs', xs)
    generate('sm', sm)
    generate('md', md)
    generate('lg', lg)
    generate('xl', xl)
    generate('xxl', xxl)

    return [result, aligns] as const
  }, [ns, xs, sm, md, lg, xl, xxl])

  return {
    cssVars,
    classNames: {
      root: cn(ns, classes, {
        [`${ns}--${span}`]: !isUndefined(span),
        [`${ns}--offset-${offset}`]: !isUndefined(offset),
        [`${ns}--order-${order}`]: !isUndefined(order),
        [`${ns}--pull-${pull}`]: !isUndefined(pull),
        [`${ns}--push-${push}`]: !isUndefined(push),
        [`${ns}--flex`]: !isUndefined(flex),
      }),
    },
  }
}
