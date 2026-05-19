import type { DividerProps } from './divider.props'

import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
import { useDividerProps } from './hooks/use-divider-props'

function Divider(props: DividerProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    orientation,
    restAttrs,
  } = useDividerProps(props)

  const { children } = omitted

  return (
    <div
      {...restAttrs}
      className={cssNames.root}
      style={cssAttrs.root}
      role="separator"
    >
      {isRenderable(children) && orientation === 'horizontal' && (
        <span className={cssNames.content} style={cssAttrs.content}>
          {children}
        </span>
      )}
    </div>
  )
}

defineName(Divider)

export default Divider
