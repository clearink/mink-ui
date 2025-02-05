import type { CSSProperties } from 'react'

import { semanticNames } from '@mink-ui/core/_shared/constants'
import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { isNullish, omit } from '@mink-ui/shared'

import type { DividerProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'
import { defaultDividerProps } from './props'

const excluded = [
  'children',
  'dashed',
  'align',
  'margin',
  'plain',
  'direction',
  ...semanticNames,
] as const

function Divider(_props: DividerProps) {
  const props = withDefaults(_props, defaultDividerProps)

  const { align, children, direction, margin } = props

  const prefixCls = usePrefixCls('divider')

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  const marginStyle: CSSProperties = {}

  if (align === 'left') marginStyle.marginLeft = margin
  else if (align === 'right') marginStyle.marginRight = margin

  return (
    <div {...omit(props, excluded)} className={classNames.root} style={styles.root}>
      {direction === 'horizontal' && !isNullish(children) && (
        <span
          className={classNames.text}
          style={{ ...styles.text, ...marginStyle }}
        >
          {children}
        </span>
      )}
    </div>
  )
}

betterDisplayName(Divider)

export default Divider
