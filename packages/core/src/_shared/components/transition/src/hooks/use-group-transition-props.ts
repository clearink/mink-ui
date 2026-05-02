import type { UniquedTransitionItem } from '../_shared.props'
import type { GroupTransitionProps } from '../group-transition.props'

import { useImperativeHandle } from 'react'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { GroupTransitionControl } from '../utils/group-transition-control'
import { isItemsEqual } from '../utils/helpers'

export function useGroupTransitionProps<T extends UniquedTransitionItem>(props: GroupTransitionProps<T>) {
  const { ref, items } = props

  const forceUpdate = useForceUpdate()

  const control = useConstant(() => new GroupTransitionControl(forceUpdate, props))

  useInvoke(() => { control.updateInternals(props) })

  const returnEarly = useWatchValue(items, {
    compare: isItemsEqual,
    listener: (current) => {
      if (isItemsEqual(control.current, current)) return

      control.runGroupTransition()
    },
  })

  useImperativeHandle(ref, () => ({
    get instances() { return control._instances },
  }), [control._instances])

  return {
    returnEmpty: returnEarly,
    renderEntries: control.renderEntries,
  }
}
