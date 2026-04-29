import type { SwitchTransitionProps } from '../switch-transition.props'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { isNodeEqual } from '../utils/helpers'
import { SwitchTransitionControl } from '../utils/switch-transition-control'

export function useSwitchTransitionProps(props: SwitchTransitionProps) {
  const { children, mode } = props

  const forceUpdate = useForceUpdate()

  const control = useConstant(() => new SwitchTransitionControl(forceUpdate, props))

  useInvoke(() => { control.updateInternals(props) })

  const returnEarly = useWatchValue(children, {
    compare: (curr, prev) => isNodeEqual(curr, prev),
    listener: (current) => {
      if (isNodeEqual(control.current, current)) return

      if (mode === 'out-in') control.runOutInSwitch()
      else if (mode === 'in-out') control.runInOutSwitch()
      else control.runDefaultSwitch()
    },
  })

  return {
    omitted: props,
    returnEmpty: returnEarly,
    renderEntries: control.renderEntries,
  }
}
