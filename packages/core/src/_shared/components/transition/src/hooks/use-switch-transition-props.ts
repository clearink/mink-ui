import type { UniquedTransitionItem } from '../_shared.props'
import type { SwitchTransitionProps } from '../switch-transition.props'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { isItemEqual } from '../utils/helpers'
import { SwitchTransitionControl } from '../utils/switch-transition-control'

export function useSwitchTransitionProps<T extends UniquedTransitionItem>(props: SwitchTransitionProps<T>) {
  const { current, mode } = props

  const forceUpdate = useForceUpdate()

  const control = useConstant(() => new SwitchTransitionControl(forceUpdate, props))

  useInvoke(() => { control.updateInternals(props) })

  const returnEarly = useWatchValue(current, {
    compare: isItemEqual,
    listener: () => {
      if (isItemEqual(control.current, current)) return

      if (mode === 'out-in') control.runOutInSwitch()
      else if (mode === 'in-out') control.runInOutSwitch()
      else control.runDefaultSwitch()
    },
  })

  return {
    returnEmpty: returnEarly,
    renderEntries: control.renderEntries,
  }
}
