import { omit } from '@mink-ui/shared'
import { type ForwardedRef, forwardRef } from 'react'

import type { ColProps } from './props'

import { semanticNames } from '../../_shared/constants'
import { usePrefixCls, useSemanticStyles } from '../../_shared/hooks'
import { BREAKPOINT_NAME } from '../../_shared/hooks/use-breakpoint/breakpoint'
import { betterDisplayName } from '../../_shared/utils'
import { RowContext } from '../../row/_shared.context'
import useColFlex from './hooks/use-col-flex'
import useFormatClassNames from './hooks/use-format-class-names'

const excluded = [
  'children',
  'style',
  'flex',
  'span',
  'offset',
  'order',
  'pull',
  'push',
  ...BREAKPOINT_NAME,
  ...semanticNames,
] as const

function Col(props: ColProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children } = props

  const prefixCls = usePrefixCls('col')

  const styles = useSemanticStyles(props)

  const classNames = useFormatClassNames(prefixCls, props)

  const gutter = RowContext.useState() / 2

  const gapStyle = gutter ? { paddingLeft: gutter, paddingRight: gutter } : undefined

  const flex = useColFlex(props.flex)

  return (
    <div
      {...omit(props, excluded)}
      ref={ref}
      className={classNames.root}
      style={{ ...styles.root, flex, ...gapStyle }}
    >
      {children}
    </div>
  )
}

betterDisplayName(Col)

export default forwardRef(Col)
