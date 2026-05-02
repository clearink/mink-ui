import type { UniquedTransitionItem } from './_shared.props'
import type { SwitchTransitionProps } from './switch-transition.props'

import { defineName } from '../../../utils/define-name'
import { useSwitchTransitionProps } from './hooks/use-switch-transition-props'

function SwitchTransition<T extends UniquedTransitionItem>(props: SwitchTransitionProps<T>) {
  const { returnEmpty, renderEntries } = useSwitchTransitionProps<T>(props)

  return returnEmpty ? null : renderEntries()
}

defineName(SwitchTransition)

export default SwitchTransition
