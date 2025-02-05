import type { CSSProperties, ForwardedRef } from 'react'

import { semanticNames } from '@mink-ui/core/_shared/constants'
import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { omit } from '@mink-ui/shared'
import { forwardRef } from 'react'

import type { RowProps } from './props'

import { RowContext } from '../_shared.context'
import useFormatClassNames from './hooks/use-format-class-names'
import useRowGutter from './hooks/use-row-gutter'
import { defaultRowProps } from './props'

const excluded = [
  'children',
  'gutter',
  'align',
  'justify',
  'wrap',
  ...semanticNames,
] as const

function Row(_props: RowProps, ref: ForwardedRef<HTMLDivElement>) {
  const props = withDefaults(_props, defaultRowProps)

  const { children, gutter } = props

  const prefixCls = usePrefixCls('row')

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  const [hGutter, vGutter] = useRowGutter(gutter!)

  const gutterStyle: CSSProperties = {}

  if (hGutter) gutterStyle.marginLeft = hGutter / -2

  if (vGutter) gutterStyle.rowGap = vGutter

  return (
    <div
      {...omit(props, excluded)}
      ref={ref}
      className={classNames.root}
      style={{ ...styles.root, ...gutterStyle }}
    >
      <RowContext.Provider value={hGutter}>{children}</RowContext.Provider>
    </div>
  )
}

betterDisplayName(Row)

export default forwardRef(Row)
