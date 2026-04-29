import type { DividerProps } from './divider.props'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { defineName } from '../../_shared/utils/define-name'
import { useDividerProps } from './hooks/use-divider-props'

function Divider(props: DividerProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    finalOrientation,
  } = useDividerProps(props)

  const { children } = omitted

  return (
    <div
      {...restAttrs}
      className={cssNames.root}
      style={cssAttrs.root}
      role="separator"
    >
      {!isNullish(children) && finalOrientation === 'horizontal' && (
        <span className={cssNames.content} style={cssAttrs.content}>
          {children}
        </span>
      )}
    </div>
  )
}

defineName(Divider)

export default Divider
