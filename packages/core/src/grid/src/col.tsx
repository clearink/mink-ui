import type { ColProps } from './col.props'

import { defineName } from '../../_shared/utils/define-name'
import { useColProps } from './hooks/use-grid-props'

function Col(props: ColProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    extraCssAttrs,
    cssVars,
    restAttrs,
  } = useColProps(props)

  const { ref, children } = omitted

  return (
    <div
      {...restAttrs}
      ref={ref}
      className={cssNames.root}
      style={{ ...cssAttrs.root, ...extraCssAttrs, ...cssVars }}
    >
      {children}
    </div>
  )
}

defineName(Col, 'Grid.Col')

export default Col
