import type { RowProps } from './row.props'

import { defineName } from '../../_shared/utils/define-name'
import { RowGutterContext } from './_shared.context'
import { useRowProps } from './hooks/use-grid-props'

function Row(props: RowProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    rowGutterContextValue,
    extraCssAttrs,
    restAttrs,
  } = useRowProps(props)

  const { ref, children } = omitted

  return (
    <div
      {...restAttrs}
      ref={ref}
      className={cssNames.root}
      style={{ ...cssAttrs.root, ...extraCssAttrs }}
    >
      <RowGutterContext value={rowGutterContextValue}>
        {children}
      </RowGutterContext>
    </div>
  )
}

defineName(Row, 'Grid.Row')

export default Row
