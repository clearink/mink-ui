import type { CSSProperties } from 'react'
import type { ColProps } from '../col.props'
import type { OmittedRowProps, PickedRowProps, RowProps } from '../row.props'

import { useMemo } from 'react'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { RowGutterContext } from '../_shared.context'
import { excludedColProps } from '../col.props'
import { defaultRowProps as defaultProps, excludedRowProps } from '../row.props'
import { formatGridFlex, formatGridGutter } from '../utils/format'
import { useColClassNames, useRowClassNames } from './use-class-names'
import { useResponsiveValues } from './use-responsive-values'

export function useRowProps(props: RowProps) {
  const {
    gutter = defaultProps.gutter,
    wrap = defaultProps.wrap,
  } = props

  const omitted = props as OmittedRowProps
  const picked: PickedRowProps = { gutter, wrap }

  const { hGutter, vGutter, hLayout, vLayout } = useResponsiveValues(picked, omitted)

  const classNames = useRowClassNames(picked, omitted, hLayout, vLayout)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      classNames,
      { root: omitted.className },
    ],
    [
      { root: omitted.style },
    ],
  )

  const rowGutterContextValue = useMemo(() => ({ gutter: hGutter, wrap }), [hGutter, wrap])

  const extraCssAttrs = useMemo(() => {
    const result: CSSProperties = {}

    const spacing = formatGridGutter(hGutter, -2)

    if (spacing) result.marginLeft = spacing

    if (spacing) result.marginRight = spacing

    if (vGutter) result.rowGap = vGutter

    return result
  }, [hGutter, vGutter])

  const restAttrs = omit(props, excludedRowProps)

  return {
    omitted,
    cssNames,
    cssAttrs,
    rowGutterContextValue,
    extraCssAttrs,
    restAttrs,
  }
}

export function useColProps(props: ColProps) {
  const rowGutterContext = RowGutterContext.use()

  const { flex } = props

  const { cssVars, classNames } = useColClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      classNames,
      { root: props.className },
    ],
    [
      { root: props.style },
    ],
  )

  const extraCssAttrs = useMemo(() => {
    const result: CSSProperties = {}

    const spacing = formatGridGutter(rowGutterContext.gutter, 2)

    if (spacing) result.paddingLeft = spacing
    if (spacing) result.paddingRight = spacing

    const alignment = formatGridFlex(flex)

    if (isUndefined(alignment)) return result

    result.flex = alignment

    if (!rowGutterContext.wrap) result.minWidth = 0

    return result
  }, [rowGutterContext.gutter, rowGutterContext.wrap, flex])

  const restAttrs = omit(props, excludedColProps)

  return {
    omitted: props,
    cssNames,
    cssAttrs,
    cssVars,
    extraCssAttrs,
    restAttrs,
  }
}
