import type { UniqueTransitionItem } from '../_shared.props'
import type { GroupTransitionProps } from '../group-transition.props'

import { useImperativeHandle } from 'react'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { GroupTransitionControl } from '../utils/group-transition-control'
import { isItemsEqual } from '../utils/helpers'

export function useGroupTransitionProps<T extends UniqueTransitionItem>(props: GroupTransitionProps<T>) {
  const { ref, items } = props

  const forceUpdate = useForceUpdate()

  const control = useConstant(() => new GroupTransitionControl(forceUpdate, props))

  useInvoke(() => { control._bind(props) })

  const returnEarly = useWatchValue(items, () => { control.runGroupTransition() }, isItemsEqual)

  useImperativeHandle(ref, () => ({
    get instances() { return control.instances },
  }), [control.instances])

  return {
    returnEmpty: returnEarly,
    renderEntries: control.renderEntries,
  }
}
