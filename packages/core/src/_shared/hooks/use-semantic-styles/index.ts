import { useMemo } from 'react'

import type { SemanticStyledProps, StyledProps } from '../../../_shared/types'

export function useSemanticStyles<K extends string>(
  props: SemanticStyledProps<K>,
  context?: StyledProps,
) {
  const { style, styles } = props

  const { style: ctx } = context || {}

  return useMemo(() => {
    const result: Record<string, any> = { ...styles }

    if (style || ctx) result.root = { ...ctx, ...style, ...result.root }

    return result as Partial<Record<'root' | K, React.CSSProperties>>
  }, [ctx, style, styles])
}
