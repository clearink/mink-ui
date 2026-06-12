import type { GridAlign, GridJustify } from '../_shared.props'
import type { ColProps } from '../col.props'
import type { OmittedRowProps, PickedRowProps } from '../row.props'

import isEqual from 'react-fast-compare'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { useComputed } from '../../../_shared/hooks/use-computed'
import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { resolveColBreakpoints } from '../utils/helpers'

export function useRowClassNames(
  picked: PickedRowProps,
  omitted: OmittedRowProps,
  others: { align?: GridAlign, justify?: GridJustify },
) {
  const { wrap } = picked
  const { prefixCls } = omitted
  const { align, justify } = others

  const ns = useNamespace('row', prefixCls)

  return {
    classNames: {
      root: cn(ns, {
        [`${ns}--wrap`]: wrap,
        [`${ns}--align-${align}`]: align,
        [`${ns}--justify-${justify}`]: justify,
      }),
    },
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

  const [classes, cssVars] = useComputed(
    () => resolveColBreakpoints(ns, { xs, sm, md, lg, xl, xxl }),
    [ns, xs, sm, md, lg, xl, xxl],
    isEqual,
  )

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
