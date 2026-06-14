import type { CssTransitionProps } from './css-transition.props'

import { defineName } from '../../../utils/define-name'
import { useCssTransitionProps } from './hooks/use-css-transition-props'

function CssTransition<E extends HTMLElement>(props: CssTransitionProps<E>) {
  const { omitted, control, getters, returnEmpty } = useCssTransitionProps(props)

  const { children } = omitted

  return returnEmpty ? null : children(control.$element, getters)
}

defineName(CssTransition)

export default CssTransition
