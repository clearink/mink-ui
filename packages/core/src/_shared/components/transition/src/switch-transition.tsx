import type { SwitchTransitionProps } from './switch-transition.props'

import { defineName } from '../../../utils/define-name'
import { useSwitchTransitionProps } from './hooks/use-switch-transition-props'

function SwitchTransition(props: SwitchTransitionProps) {
  const { omitted, returnEmpty, renderEntries } = useSwitchTransitionProps(props)

  const { children } = omitted

  return returnEmpty ? null : renderEntries(children)
}

defineName(SwitchTransition)

export default SwitchTransition
